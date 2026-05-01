/* ══════════════════════════════════════════════════════════════
   <discussion-panel> — Right-docked discussion panel
   Auto-wires itself to the page's <playbook-header> — just include
   the CSS + JS on any playbook page and the Comments button will
   open a squeeze-out panel with threaded comments.

   Data source (optional, falls back to bundled default):
     <discussion-panel>
       <script type="application/json" class="dp-data">
         [ { "id": "c1", "author": "...", "isAgent": false,
             "text": "...", "timestamp": "2h ago",
             "replies": [...] } ]
       </script>
     </discussion-panel>

   If no <discussion-panel> element exists on the page, one is
   auto-appended to <body> with DEFAULT_COMMENTS. When the panel is
   open, `body.dp-open` is toggled so CSS can squeeze content.
   ══════════════════════════════════════════════════════════════ */

(function () {
  if (customElements.get('discussion-panel')) return;

  /* Right-drawer mutex: close self when any other right drawer (e.g. parent Chat) opens */
  window.addEventListener('message', function (e) {
    var data = e && e.data;
    if (!data || typeof data !== 'object') return;
    if (data.type !== 'alva:drawer-open') return;
    if (data.drawer === 'discussion') return;
    document.querySelectorAll('discussion-panel[open]').forEach(function (h) { closePanel(h); });
  });

  /* ── default mock (generic investing thread) ── */
  var DEFAULT_COMMENTS = [
    {
      id: 'c1', author: 'Marcus Reed', isAgent: false, timestamp: '2h ago',
      text: "The thesis is interesting but I'm worried about **valuation compression** on the core names. What's the downside scenario if guidance gets cut next cycle?",
      replies: [
        {
          id: 'c1-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 55m ago',
          text: 'Downside model assumes a **20% demand cut** from top buyers. Under that scenario:\n- Primary names drop ~`-22%`\n- Secondary names hold up better (`-8%`)\n- Infrastructure names most defensive (`-5%`)\n\nFull sensitivity analysis is in the Risks tab.'
        },
        {
          id: 'c1-r2', author: 'Priya Shah', isAgent: false, timestamp: '1h 40m ago',
          text: "Same concern here. I'm hedging with short-dated puts at the ATM strike."
        }
      ]
    },
    {
      id: 'c2', author: 'Frank Li', isAgent: false, timestamp: '1h 30m ago',
      text: "Sharpe of `2.41` looks impressive, but is it in-sample? Any **out-of-sample** validation? Walk-forward results would be more convincing.",
      replies: [
        {
          id: 'c2-r1', author: 'Alva Agent', isAgent: true, timestamp: '1h 20m ago',
          text: 'Good question. Uses **walk-forward** optimization with 6-month training / 2-month validation windows across 4 years. OOS Sharpe averages `2.18` — lower than in-sample but still robust.'
        },
        {
          id: 'c2-r2', author: 'Sarah Park', isAgent: false, timestamp: '1h 10m ago',
          text: "I ran my own OOS test on the last 6 months — can confirm it holds up. Sharpe was `2.23` on my run."
        }
      ]
    },
    {
      id: 'c3', author: 'Carol Wu', isAgent: false, timestamp: '45m ago',
      text: 'I forked this and added a **mean-reversion overlay** — works well for ranging markets.\n\nKey changes:\n- Added Bollinger Band squeeze detection\n- Reduced trade frequency by ~30%\n- Improved Sharpe from `2.41` to `2.67` in backtests'
    },
    {
      id: 'c4', author: 'Dave Kim', isAgent: false, timestamp: '30m ago',
      text: "What's the recommended position sizing? The docs mention 5-15% per name.",
      replies: [
        {
          id: 'c4-r1', author: 'Alva Agent', isAgent: true, timestamp: '20m ago',
          text: '**Position sizing:** For portfolios `>$100K`, 8-12% per name balances concentration risk.\n- Conservative: 5-8%\n- Moderate: 8-12%\n- Aggressive: 12-15%'
        }
      ]
    },
    {
      id: 'c5', author: 'Jenny Zhao', isAgent: false, timestamp: '25m ago',
      text: "Running this **live for 6 weeks** — up **+14.8%** vs benchmark +3.1%. Signal quality has been impressive."
    },
    {
      id: 'c6', author: 'Ryan Chen', isAgent: false, timestamp: '10m ago',
      text: "From a **macro** perspective, the setup looks favorable — the thesis is still early in absolute dollar terms even if the stocks look extended on multiples."
    }
  ];

  var AVATAR_PALETTE = ['#EE6352','#59CD90','#3FA7D6','#FAC05E','#F79D84','#9B72CF','#F4845F','#5DA9E9','#C77DFF','#06A77D'];

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Minimal markdown: **bold**, `code`, `- bullet` lists, newlines. */
  function renderMarkdown(src) {
    var text = String(src == null ? '' : src);
    var lines = text.split('\n');
    var out = [];
    var i = 0;
    function inline(s) {
      s = esc(s);
      s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
      s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      return s;
    }
    while (i < lines.length) {
      var line = lines[i];
      if (/^\s*-\s+/.test(line)) {
        var items = [];
        while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
          items.push('<li>' + inline(lines[i].replace(/^\s*-\s+/, '')) + '</li>');
          i++;
        }
        out.push('<ul>' + items.join('') + '</ul>');
        continue;
      }
      out.push('<span>' + inline(line) + '</span>');
      i++;
    }
    return out.join('<br>');
  }

  function avatarColor(name) {
    var s = 0, str = String(name || '');
    for (var i = 0; i < str.length; i++) s += str.charCodeAt(i);
    return AVATAR_PALETTE[s % AVATAR_PALETTE.length];
  }

  function renderAvatar(name, isAgent) {
    var initial = (String(name || '?').trim().charAt(0) || '?').toUpperCase();
    var cls = 'dp-avatar' + (isAgent ? ' is-agent' : '');
    var style = isAgent ? '' : 'style="background:' + avatarColor(name) + '"';
    return '<div class="' + cls + '" ' + style + '>' + esc(initial) + '</div>';
  }

  function renderComment(c) {
    return (
      '<div class="dp-comment">' +
        renderAvatar(c.author, !!c.isAgent) +
        '<div class="dp-comment-body">' +
          '<div class="dp-comment-head">' +
            '<span class="dp-author">' + esc(c.author || '') + '</span>' +
            (c.isAgent ? '<span class="dp-agent-badge">Agent</span>' : '') +
            '<span class="dp-time">' + esc(c.timestamp || '') + '</span>' +
          '</div>' +
          '<div class="dp-md">' + renderMarkdown(c.text || '') + '</div>' +
          '<button class="dp-reply-btn" type="button" data-reply-target="' + esc(c.id) + '">' +
            '<span class="dp-reply-icon" aria-hidden="true"></span>' +
            '<span>Reply</span>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  }

  function renderThread(c) {
    var hasReplies = Array.isArray(c.replies) && c.replies.length > 0;
    var html = '<div class="dp-thread" data-thread-id="' + esc(c.id) + '">';
    if (hasReplies) html += '<div class="dp-thread-vline" style="top:34px;bottom:0;"></div>';
    html += renderComment(c);
    if (hasReplies) {
      html += '<div class="dp-replies">';
      c.replies.forEach(function (r, idx) {
        var isLast = idx === c.replies.length - 1;
        html += '<div class="dp-thread" data-thread-id="' + esc(r.id) + '">';
        html += '<div class="dp-thread-hline"></div>';
        if (!isLast) html += '<div class="dp-thread-vline" style="top:34px;bottom:0;left:-21px;"></div>';
        html += renderThread(r);
        html += '</div>';
      });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function renderReplyInput(targetAuthor, targetId) {
    return (
      '<div class="dp-reply-input" data-reply-input="' + esc(targetId) + '">' +
        '<div class="dp-reply-input-col">' +
          '<p class="dp-reply-input-label">Replying to ' + esc(targetAuthor) + '</p>' +
          '<textarea placeholder="Write a reply..."></textarea>' +
          '<div class="dp-reply-actions">' +
            '<button class="dp-reply-submit" type="button">Reply</button>' +
            '<button class="dp-reply-cancel" type="button" data-reply-cancel>Cancel</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function countAll(comments) {
    var n = 0;
    (comments || []).forEach(function (c) {
      n += 1 + ((c.replies && c.replies.length) || 0);
    });
    return n;
  }

  function readData(host) {
    var node = host.querySelector('script.dp-data[type="application/json"]');
    if (!node) return null;
    try {
      var data = JSON.parse(node.textContent || '[]');
      return Array.isArray(data) ? data : null;
    } catch (e) {
      console.warn('[discussion-panel] invalid JSON', e);
      return null;
    }
  }

  function findComment(list, id) {
    for (var i = 0; i < list.length; i++) {
      var c = list[i];
      if (c.id === id) return c;
      if (c.replies && c.replies.length) {
        var found = findComment(c.replies, id);
        if (found) return found;
      }
    }
    return null;
  }

  function render(host) {
    var comments = host._dpComments || [];
    var total = countAll(comments);

    var listHtml = comments.map(function (c) {
      return '<div class="dp-thread-wrap" data-top-id="' + esc(c.id) + '">' + renderThread(c) + '</div>';
    }).join('');

    host.innerHTML =
      '<div class="dp-shell">' +
        '<div class="dp-resizer" data-resizer></div>' +
        '<div class="dp-header">' +
          '<div class="dp-title-row">' +
            '<p class="dp-title">Discussion</p>' +
            '<span class="dp-count">' + total + '</span>' +
          '</div>' +
          '<button class="dp-close" type="button" aria-label="Close" data-close></button>' +
        '</div>' +
        '<div class="dp-list" data-list>' + listHtml + '</div>' +
        '<div class="dp-footer">' +
          '<div class="dp-footer-wrap" data-footer>' +
            '<input class="dp-footer-input" type="text" placeholder="Write a reply" data-footer-input />' +
            '<button class="dp-send" type="button" data-send>' +
              '<span class="dp-send-icon" aria-hidden="true"></span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    if (host._dpDataScript && !host.contains(host._dpDataScript)) {
      host.appendChild(host._dpDataScript);
    }
  }

  function bindEvents(host) {
    host.addEventListener('click', function (e) {
      var t = e.target;
      if (!(t instanceof Element)) return;

      if (t.closest('[data-close]')) {
        closePanel(host);
        return;
      }

      var replyBtn = t.closest('[data-reply-target]');
      if (replyBtn) {
        var id = replyBtn.getAttribute('data-reply-target');
        var comment = findComment(host._dpComments || [], id);
        if (!comment) return;
        var existing = host.querySelector('[data-reply-input]');
        if (existing) existing.remove();
        var panel = replyBtn.closest('.dp-thread');
        if (panel) {
          panel.insertAdjacentHTML('beforeend', renderReplyInput(comment.author, id));
          var ta = panel.querySelector('[data-reply-input] textarea');
          if (ta) ta.focus();
        }
        return;
      }

      if (t.closest('[data-reply-cancel]')) {
        var wrap = t.closest('[data-reply-input]');
        if (wrap) wrap.remove();
        return;
      }
    });

    host.addEventListener('input', function (e) {
      var input = e.target.closest('[data-footer-input]');
      if (!input) return;
      var send = host.querySelector('[data-send]');
      if (send) send.classList.toggle('is-active', !!input.value.trim());
    });

    host.addEventListener('focusin', function (e) {
      if (e.target.closest('[data-footer-input]')) {
        var w = host.querySelector('[data-footer]');
        if (w) w.classList.add('is-focus');
      }
    });
    host.addEventListener('focusout', function (e) {
      if (e.target.closest('[data-footer-input]')) {
        var w = host.querySelector('[data-footer]');
        if (w) w.classList.remove('is-focus');
      }
    });

    var onKey = function (e) {
      if (e.key === 'Escape' && host.hasAttribute('open')) closePanel(host);
    };
    document.addEventListener('keydown', onKey);
    host._dpCleanup = (host._dpCleanup || []).concat(function () {
      document.removeEventListener('keydown', onKey);
    });

    var resizer = host.querySelector('[data-resizer]');
    if (resizer) {
      resizer.addEventListener('mousedown', function (e) {
        e.preventDefault();
        var startX = e.clientX;
        var startW = host.getBoundingClientRect().width;
        var onMove = function (ev) {
          var w = Math.min(640, Math.max(320, startW + (startX - ev.clientX)));
          host.style.width = w + 'px';
          // keep squeeze padding in sync
          document.body.style.setProperty('--dp-width', (w + 8) + 'px');
          if (host.hasAttribute('open')) document.body.style.paddingRight = (w + 8) + 'px';
        };
        var onUp = function () {
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('mouseup', onUp);
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        };
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
      });
    }
  }

  function openPanel(host) {
    host.setAttribute('open', '');
    document.body.classList.add('dp-open');
    var header = document.querySelector('playbook-header');
    if (header) header.setAttribute('discuss-active', 'true');
    try { window.parent.postMessage({ type: 'alva:drawer-open', drawer: 'discussion' }, '*'); } catch (_) {}
  }
  function closePanel(host) {
    host.removeAttribute('open');
    document.body.classList.remove('dp-open');
    var header = document.querySelector('playbook-header');
    if (header) header.setAttribute('discuss-active', 'false');
    host.dispatchEvent(new CustomEvent('discussion-panel-close', { bubbles: true }));
  }

  function ensureWiredToHeader(host) {
    var header = document.querySelector('playbook-header');
    if (!header || header._dpWired) return;
    header._dpWired = true;
    header.addEventListener('playbook-discuss-click', function () {
      if (host.hasAttribute('open')) closePanel(host);
      else openPanel(host);
    });
  }

  class DiscussionPanel extends HTMLElement {
    connectedCallback() {
      if (this._dpMounted) return;
      this._dpMounted = true;
      var self = this;
      var mount = function () {
        self._dpDataScript = self.querySelector('script.dp-data[type="application/json"]');
        var custom = readData(self);
        self._dpComments = custom && custom.length ? custom : DEFAULT_COMMENTS.slice();
        render(self);
        bindEvents(self);
        ensureWiredToHeader(self);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
      } else {
        Promise.resolve().then(mount);
      }
    }
    disconnectedCallback() {
      (this._dpCleanup || []).forEach(function (fn) { try { fn(); } catch (_) {} });
      this._dpCleanup = [];
    }
  }

  customElements.define('discussion-panel', DiscussionPanel);

  /* ── Auto-mount: if a playbook-header exists on the page and no
     <discussion-panel> has been placed, create one automatically. ── */
  function autoMount() {
    if (!document.querySelector('playbook-header')) return;
    if (document.querySelector('discussion-panel')) return;
    var el = document.createElement('discussion-panel');
    document.body.appendChild(el);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount, { once: true });
  } else {
    autoMount();
  }
})();

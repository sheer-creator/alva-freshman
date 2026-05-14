/* ══════════════════════════════════════════════════════════════
   Playbook Inspector — click-to-select element editing tool.
   Runs inside the playbook iframe; activated / deactivated by
   postMessage from the React host.

   Activation  : parent sends  { type: 'alva:inspector-activate' }
   Deactivation: parent sends  { type: 'alva:inspector-deactivate' }

   On confirm  : posts back    { type: 'alva:inspector-quote', ... }
   On exit     : posts back    { type: 'alva:inspector-deactivated' }
   ══════════════════════════════════════════════════════════════ */

(function () {
  /* ── state ── */
  var active = false;
  var hoveredEl = null;
  var selectedEl = null;
  var overlay = null;   // highlight rectangle
  var label = null;     // tag-name pill
  var dialog = null;    // edit popover
  var badgeCount = 0;   // sequential annotation counter
  var badges = [];      // DOM elements for numbered badges

  /* ── helpers ── */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /** True for elements the picker should never highlight */
  function isIgnored(el) {
    if (!el || el === document.body || el === document.documentElement) return true;
    if (el.closest && el.closest('.alva-inspector-ui')) return true;
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.tagName === 'LINK' || el.tagName === 'META') return true;
    /* only allow elements inside .playbook-container, but not the container itself */
    if (!el.closest || !el.closest('.playbook-container')) return true;
    if (el.classList && el.classList.contains('playbook-container')) return true;
    return false;
  }

  /** Build a short, human-readable CSS-ish path (≤3 segments) */
  function selectorPath(el) {
    var parts = [];
    var cur = el;
    while (cur && cur !== document.body && parts.length < 3) {
      var tag = cur.tagName.toLowerCase();
      var id = cur.id ? '#' + cur.id : '';
      var cls = '';
      if (!id && cur.className && typeof cur.className === 'string') {
        var names = cur.className.trim().split(/\s+/).filter(function (c) {
          return c.indexOf('alva-inspector') === -1;
        });
        if (names.length) cls = '.' + names.slice(0, 2).join('.');
      }
      parts.unshift(tag + id + cls);
      cur = cur.parentElement;
    }
    return parts.join(' > ');
  }

  /** Detect if element is primarily text (leaf node or only inline children) */
  var INLINE_TAGS = { SPAN:1, STRONG:1, EM:1, B:1, I:1, A:1, SMALL:1, SUB:1, SUP:1, MARK:1, CODE:1, BR:1, ABBR:1 };
  function isTextElement(el) {
    var text = (el.textContent || '').trim();
    if (!text) return false;
    if (el.childElementCount === 0) return true;
    for (var i = 0; i < el.children.length; i++) {
      if (!INLINE_TAGS[el.children[i].tagName]) return false;
    }
    return true;
  }

  /** Get visible text for the text-edit field */
  function getVisibleText(el) {
    return (el.innerText || el.textContent || '').trim();
  }

  /* ── overlay & label (created once, reused) ── */
  function ensureUI() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'alva-inspector-ui alva-inspector-overlay';
    document.body.appendChild(overlay);

    label = document.createElement('div');
    label.className = 'alva-inspector-ui alva-inspector-label';
    document.body.appendChild(label);
  }

  function positionOverlay(el) {
    var r = el.getBoundingClientRect();
    var sy = window.scrollY;
    var sx = window.scrollX;
    overlay.style.display = 'block';
    overlay.style.top  = (r.top  + sy) + 'px';
    overlay.style.left = (r.left + sx) + 'px';
    overlay.style.width  = r.width  + 'px';
    overlay.style.height = r.height + 'px';

    var tag = el.tagName.toLowerCase();
    var cls = (el.className && typeof el.className === 'string')
      ? '.' + el.className.trim().split(/\s+/).filter(function (c) {
          return c.indexOf('alva-inspector') === -1;
        })[0]
      : '';
    if (cls === '.undefined' || cls === '.') cls = '';
    label.textContent = tag + (el.id ? '#' + el.id : cls);
    label.style.display = 'block';
    label.style.top  = Math.max(0, r.top + sy - 22) + 'px';
    label.style.left = (r.left + sx) + 'px';
  }

  function hideOverlay() {
    if (overlay) { overlay.style.display = 'none'; overlay.classList.remove('is-selected'); }
    if (label)   label.style.display = 'none';
  }

  /* ── CDN icon helper ── */
  var CDN_BASE = 'https://alva-ai-static.b-cdn.net/icons';
  function cdnIcon(name, size) {
    return '<img src="' + CDN_BASE + '/' + name + '.svg" width="' + size + '" height="' + size + '" style="display:block;" />';
  }

  /* ── per-dialog state for live preview ── */
  var _editingEl = null;       // element being edited
  var _originalHTML = null;     // original innerHTML to restore on cancel
  var _originalText = '';       // original visible text for comparison

  /** Update send button: active only when there's an actual change */
  function updateSendState() {
    if (!dialog) return;
    var instrInput = dialog.querySelector('.aid-instruction-input');
    var textInput  = dialog.querySelector('.aid-text-input');
    var sendBtn    = dialog.querySelector('.aid-send');
    if (!instrInput || !sendBtn) return;

    var hasInstruction = !!(instrInput.value || '').trim();
    var textChanged = textInput
      ? (textInput.value || '').trim() !== _originalText
      : false;
    var isActive = hasInstruction || textChanged;

    if (isActive) sendBtn.classList.add('is-active');
    else          sendBtn.classList.remove('is-active');
  }

  /** Live-preview text changes on the element */
  function onTextLiveInput() {
    if (!_editingEl || !dialog) return;
    var textInput = dialog.querySelector('.aid-text-input');
    if (!textInput) return;
    _editingEl.textContent = textInput.value;
  }

  /** Revert element to original HTML (called on cancel / close) */
  function revertLivePreview() {
    if (_editingEl && _originalHTML !== null) {
      _editingEl.innerHTML = _originalHTML;
    }
    _editingEl = null;
    _originalHTML = null;
    _originalText = '';
  }

  /* ── edit dialog ── */
  function showDialog(el) {
    closeDialog();

    var r = el.getBoundingClientRect();
    var sy = window.scrollY;
    var sx = window.scrollX;
    var sel = selectorPath(el);
    var hasText = isTextElement(el);
    var originalText = hasText ? getVisibleText(el) : '';

    /* store for live preview & send-state comparison */
    _editingEl = el;
    _originalHTML = hasText ? el.innerHTML : null;
    _originalText = originalText;

    dialog = document.createElement('div');
    dialog.className = 'alva-inspector-ui alva-inspector-dialog';

    /* position: prefer below; flip above if not enough room */
    var top = r.bottom + sy + 8;
    var spaceBelow = window.innerHeight - r.bottom;
    if (spaceBelow < 220 && r.top > 220) {
      top = r.top + sy - 8;
      dialog.dataset.flip = '1';
    }
    var left = Math.min(Math.max(10, r.left + sx), window.innerWidth - 490);
    dialog.style.top  = top + 'px';
    dialog.style.left = left + 'px';

    dialog.innerHTML =
      (hasText
        ? '<div class="aid-text-field">' +
            '<label class="aid-field-label">Text content</label>' +
            '<textarea class="aid-text-input" rows="3">' + esc(originalText) + '</textarea>' +
          '</div>' +
          '<div class="aid-divider"></div>'
        : '') +
      '<div class="aid-toolbar">' +
        '<input class="aid-instruction-input" type="text" placeholder="Describe a change" />' +
        '<button class="aid-send" type="button" aria-label="Send">' + cdnIcon('check-l1', 14) + '</button>' +
      '</div>';

    document.body.appendChild(dialog);

    /* flip upward if flagged */
    if (dialog.dataset.flip === '1') {
      var dh = dialog.offsetHeight;
      dialog.style.top = (r.top + sy - dh - 8) + 'px';
    }

    var instrInput = dialog.querySelector('.aid-instruction-input');
    var textInput  = dialog.querySelector('.aid-text-input');

    requestAnimationFrame(function () { instrInput.focus(); });

    /* send button click */
    dialog.querySelector('.aid-send').onclick = function () {
      confirmDialog(el, sel, originalText);
    };

    /* live-update send button state */
    instrInput.addEventListener('input', updateSendState);
    if (textInput) {
      textInput.addEventListener('input', updateSendState);
      /* live-preview text on the element */
      textInput.addEventListener('input', onTextLiveInput);
    }

    /* Enter in instruction → move to text field if present, else confirm */
    instrInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (textInput) textInput.focus();
        else confirmDialog(el, sel, originalText);
      }
    });

    /* Enter in text field → confirm */
    if (textInput) {
      textInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          confirmDialog(el, sel, originalText);
        }
      });
    }

    /* initial send state — inactive since nothing changed yet */
    updateSendState();
  }

  /** Update a single badge's position to match its element */
  function updateBadgePosition(badge, el) {
    var r = el.getBoundingClientRect();
    badge.style.top  = (r.top  + window.scrollY - 10) + 'px';
    badge.style.left = (r.left + window.scrollX - 10) + 'px';
  }

  /** Reposition all badges (called on scroll / resize) */
  function repositionBadges() {
    for (var i = 0; i < badges.length; i++) {
      updateBadgePosition(badges[i].dom, badges[i].el);
    }
  }

  /** Place a numbered badge at the top-left corner of the element */
  function placeBadge(el, num) {
    var badge = document.createElement('div');
    badge.className = 'alva-inspector-ui alva-inspector-badge';
    badge.textContent = String(num);
    updateBadgePosition(badge, el);
    document.body.appendChild(badge);
    badges.push({ dom: badge, el: el });
  }

  /* keep badges aligned on scroll (capture phase catches nested containers) & resize */
  window.addEventListener('scroll', repositionBadges, true);
  window.addEventListener('resize', repositionBadges);

  /** Fly a small dot from the confirm button towards the bottom-right corner */
  function animateFlyDot() {
    if (!dialog) return;
    var btn = dialog.querySelector('.aid-send');
    if (!btn) return;
    var br = btn.getBoundingClientRect();
    var startX = br.left + br.width / 2;
    var startY = br.top + br.height / 2;

    var dot = document.createElement('div');
    dot.className = 'alva-inspector-ui';
    dot.style.cssText =
      'position:fixed;width:10px;height:10px;border-radius:50%;background:#49A3A6;' +
      'z-index:99999;pointer-events:none;' +
      'left:' + startX + 'px;top:' + startY + 'px;';
    document.body.appendChild(dot);

    var dx = window.innerWidth - startX + 40;
    var dy = window.innerHeight - startY + 40;

    dot.animate([
      { transform: 'translate(-5px,-5px) scale(1)', opacity: 1 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(0.4)', opacity: 0 }
    ], { duration: 420, easing: 'cubic-bezier(0.4,0,0.2,1)', fill: 'forwards' })
    .onfinish = function () { dot.remove(); };
  }

  /** Remove all badges and reset counter */
  function clearBadges() {
    badges.forEach(function (b) { b.dom.remove(); });
    badges = [];
    badgeCount = 0;
  }

  function confirmDialog(el, sel, originalText) {
    if (!dialog) return;
    var instrInput = dialog.querySelector('.aid-instruction-input');
    var textInput  = dialog.querySelector('.aid-text-input');
    var newText = textInput ? (textInput.value || '').trim() : null;
    var instruction = (instrInput.value || '').trim();

    /* need at least one change */
    var textChanged = newText !== null && newText !== originalText;
    if (!textChanged && !instruction) {
      instrInput.focus();
      return;
    }

    badgeCount++;
    placeBadge(el, badgeCount);
    animateFlyDot();

    /* clear live-preview refs WITHOUT reverting — keep the text change */
    _editingEl = null;
    _originalHTML = null;
    _originalText = '';

    window.parent.postMessage({
      type: 'alva:inspector-quote',
      index: badgeCount,
      selector: sel,
      tagName: el.tagName.toLowerCase(),
      newText: textChanged ? newText : null,
      originalText: originalText || null,
      instruction: instruction || null,
    }, '*');

    closeDialog();
    /* stay in inspector mode — user must click the toggle icon to exit */
  }

  function closeDialog() {
    if (dialog) { dialog.remove(); dialog = null; }
    /* text changes persist — no revert on close */
    _editingEl = null;
    _originalHTML = null;
    _originalText = '';
    selectedEl = null;
    if (overlay) overlay.classList.remove('is-selected');
  }

  /* ── event handlers ── */
  function onMouseMove(e) {
    if (!active || dialog) return;
    var el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || isIgnored(el)) { hoveredEl = null; hideOverlay(); return; }
    if (el === hoveredEl) return;
    hoveredEl = el;
    positionOverlay(el);
  }

  function onClick(e) {
    if (!active) return;

    /* click outside dialog → close it */
    if (dialog) {
      if (!dialog.contains(e.target)) { closeDialog(); }
      return;
    }

    var el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || isIgnored(el)) return;

    e.preventDefault();
    e.stopPropagation();

    selectedEl = el;
    positionOverlay(el);
    overlay.classList.add('is-selected');
    showDialog(el);
  }

  function onKeyDown(e) {
    if (!active) return;
    if (e.key === 'Escape') {
      if (dialog) closeDialog();
      else deactivate();
    }
  }

  /* ── activate / deactivate ── */
  function activate() {
    if (active) return;
    active = true;
    ensureUI();
    document.body.classList.add('alva-inspector-active');
    document.addEventListener('mousemove', onMouseMove, true);
    document.addEventListener('click', onClick, true);
    document.addEventListener('keydown', onKeyDown, true);
  }

  function deactivate() {
    if (!active) return;
    active = false;
    document.body.classList.remove('alva-inspector-active');
    closeDialog();
    hideOverlay();
    clearBadges();
    hoveredEl = null;
    document.removeEventListener('mousemove', onMouseMove, true);
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('keydown', onKeyDown, true);
    window.parent.postMessage({ type: 'alva:inspector-deactivated' }, '*');
  }

  /* ── listen for parent commands ── */
  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || typeof d !== 'object') return;
    if (d.type === 'alva:inspector-activate')    activate();
    if (d.type === 'alva:inspector-deactivate') deactivate();
    if (d.type === 'alva:inspector-clear-badges') clearBadges();
    if (d.type === 'alva:inspector-remove-badge' && d.index) {
      badges = badges.filter(function (b) {
        if (b.dom.textContent === String(d.index)) { b.dom.remove(); return false; }
        return true;
      });
    }
  });

  /* Announce readiness so parent can re-send inspector state */
  window.parent.postMessage({ type: 'alva:inspector-ready' }, '*');
})();

/* ══════════════════════════════════════════════════════════════
   <playbook-header> — Playbook info header custom element
   Renders title row + meta row + description, with feeds popover
   and description expand/collapse behavior.

   Usage:
     <link rel="stylesheet" href="./components/playbook-header.css">
     <script src="./components/playbook-header.js"></script>

     <playbook-header
       title="Quality Value Stock Screener 2"
       freq="15m"
       last-updated="15 minutes ago"
       owner="YGGYLL"
       owner-seed="YGGYLL"
       views="6" remix="56" comments="6"
       description="...">
       <script type="application/json" class="pb-feeds-data">
         [
           {"id":"capacity-monitor","name":"Capacity-Monitor","interval":"20 Minutes","lastRun":"15 minutes ago","clickable":true},
           {"id":"oem-tracker","name":"OEM-Tracker","interval":"1 hour","lastRun":"2 hours ago"}
         ]
       </script>
     </playbook-header>

   Events:
     playbook-feed-click   detail: { id }   — fired when a clickable feed row is activated
     playbook-feeds-viewall                 — fired when "View all feeds in Settings" is clicked
   ══════════════════════════════════════════════════════════════ */

(function () {
  if (customElements.get('playbook-header')) return;

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function avatarUrl(seed) {
    var photoBySeed = {
      'YGGYLL': '/portrait.png',
      'Caleb Frost': '/avatars/caleb-frost.png',
      'Asha Bello': '/avatars/asha-bello.png',
      'Nina Reyes': '/avatars/nina-reyes.png'
    };
    if (photoBySeed[seed]) return photoBySeed[seed];
    var s = encodeURIComponent(seed || 'user');
    return 'https://api.dicebear.com/9.x/notionists/svg?seed=' + s + '&backgroundColor=fff3e0';
  }

  function readFeeds(host) {
    var node = host.querySelector('script.pb-feeds-data[type="application/json"]');
    if (!node) return [];
    try {
      var data = JSON.parse(node.textContent || '[]');
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.warn('[playbook-header] invalid feeds JSON', e);
      return [];
    }
  }

  function formatInterval(interval) {
    var s = String(interval == null ? '' : interval).trim();
    if (!s) return '';
    // "20 Minutes" / "1 hour" → "Every 20 minutes" / "Every 1 hour"; "Daily" / "Weekly" stay as-is
    return /^\d/.test(s) ? 'Every ' + s.toLowerCase() : s;
  }

  function renderFeeds(feeds, lastUpdated) {
    if (!feeds.length) return '';
    var allPaused = feeds.every(function (f) { return f.paused; });
    var bulkLabel = allPaused ? 'Resume all' : 'Pause all';
    var bulkIcon = allPaused ? 'feeds-popover-bulk-icon ic-play' : 'feeds-popover-bulk-icon ic-pause';
    var metaText = lastUpdated
      ? '<span class="feeds-popover-meta-text">Last Updated: ' + esc(lastUpdated) + '</span>'
      : '<span class="feeds-popover-meta-text"></span>';
    var metaRow =
      '<div class="feeds-popover-meta">' +
        metaText +
        '<button type="button" class="feeds-popover-bulk' + (allPaused ? ' is-paused' : '') + '" data-feeds-bulk aria-pressed="' + (allPaused ? 'true' : 'false') + '">' +
          '<span class="' + bulkIcon + '" aria-hidden="true"></span>' +
          '<span class="feeds-popover-bulk-label">' + bulkLabel + '</span>' +
        '</button>' +
      '</div>';
    var rows = feeds.map(function (f) {
      var paused = !!f.paused;
      var cls = 'feeds-popover-row clickable' + (paused ? ' is-paused' : '');
      var extra = ' data-feed="' + esc(f.id || '') + '" role="button" tabindex="0"';
      var lastRunText = 'Last Run: ' + String(f.lastRun == null ? '' : f.lastRun);
      var intervalText = formatInterval(f.interval);
      var toggleIcon = paused ? 'feeds-popover-row-toggle-icon ic-play' : 'feeds-popover-row-toggle-icon ic-pause';
      var toggleLabel = paused ? 'Resume' : 'Pause';
      return (
        '<div class="' + cls + '"' + extra + '>' +
          '<div class="feeds-popover-row-main">' +
            '<div class="feeds-popover-row-name">' +
              '<span class="pb-freq-dot" aria-hidden="true"></span>' +
              '<span class="feeds-popover-name-text">' + esc(f.name) + '</span>' +
            '</div>' +
            '<div class="feeds-popover-row-sub">' +
              '<span class="feeds-popover-cell-last" data-last-run="' + esc(lastRunText) + '">' + (paused ? 'Paused' : esc(lastRunText)) + '</span>' +
              (intervalText
                ? '<span class="feeds-popover-sub-sep" aria-hidden="true"></span>' +
                  '<span class="feeds-popover-cell-interval">' + esc(intervalText) + '</span>'
                : '') +
            '</div>' +
          '</div>' +
          '<button type="button" class="feeds-popover-row-toggle" data-feed-toggle aria-label="' + toggleLabel + '" title="' + toggleLabel + '" aria-pressed="' + (paused ? 'true' : 'false') + '">' +
            '<span class="' + toggleIcon + '" aria-hidden="true"></span>' +
          '</button>' +
          '<span class="feeds-popover-row-chev" aria-hidden="true"></span>' +
        '</div>'
      );
    }).join('');
    return (
      metaRow +
      rows +
      '<div class="feeds-popover-viewall" role="button" tabindex="0">' +
        '<span class="feeds-popover-viewall-label">View all automations in Settings</span>' +
        '<span class="feeds-popover-viewall-chev" aria-hidden="true"></span>' +
      '</div>'
    );
  }

  function slugify(s) {
    return String(s || '').toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function buildRemixPrompt(title) {
    var ref = '@alva/' + (slugify(title) || 'playbook');
    return 'Remix ' + ref + ' — customize it based on my preferences and deploy as a new playbook under my account.';
  }

  function buildHistoryEntries() {
    return [
      { version: 'v1.2.0', desc: 'Main tabs upgraded to tab-l (16px, gap 24px, padding-bottom 6px)', date: '04/27/2026 16:20', active: true },
      { version: 'v1.1.0', desc: 'Tab bar CSS rewritten to match Alva template: border-bottom on wrapper-row, flex-end alignment, horizontal scroll, right-group padding, responsive breakpoint', date: '04/27/2026 16:16' },
      { version: 'v1.0.0', desc: 'Remix from @yy11/next-bottleneck — tab bar CSS/HTML fixed to Alva Design System spec (7 items)', date: '04/27/2026 16:08' },
      { version: 'draft', desc: 'Draft', date: '04/27/2026 16:08' }
    ];
  }

  function renderHistory(entries) {
    return entries.map(function (e) {
      var meta = '<span>' + esc(e.date) + '</span>';
      var check = e.active
        ? '<span class="history-row-check" aria-hidden="true"></span>'
        : '';
      return (
        '<div class="history-row" role="button" tabindex="0" data-history-version="' + esc(e.version) + '"' + (e.active ? ' aria-current="true"' : '') + '>' +
          '<div class="history-row-body">' +
            '<div class="history-row-title">' +
              '<span class="history-row-version">' + esc(e.version) + '</span>' +
              '<span class="history-row-bullet" aria-hidden="true">•</span>' +
              '<span>' + esc(e.desc) + '</span>' +
            '</div>' +
            '<div class="history-row-meta">' + meta + '</div>' +
          '</div>' +
          check +
        '</div>'
      );
    }).join('');
  }

  function buildExternalRemixPrompt(title) {
    var ref = '@alva/' + (slugify(title) || 'playbook');
    return 'Remix Playbook(' + ref + '):\n\n' +
      'If you have the Alva skill → use it to build my own version.\n' +
      'If not → install it first: npx skills add https://github.com/alva-ai/skills\n\n' +
      'Then:\n' +
      '1. Customize it based on my preferences\n' +
      '2. Deploy as a new playbook under my account\n' +
      '3. If I don\'t specify what to change, ask me what I\'d like to customize.';
  }

  /* 频道选择 mock 数据（Figma 8869:68755）：Alva agent 会话 + channel 列表，默认选 sheer-test-1 */
  var ALERT_CHANNELS = [
    { name: 'Alva', kind: 'agent' },
    { name: 'sheer-test-1', kind: 'channel' },
    { name: 'sheer-test-2', kind: 'channel' },
    { name: 'sheer-test-3', kind: 'channel' },
    { name: 'sheer-test-4', kind: 'channel' }
  ];
  var DEFAULT_CHANNEL = 'sheer-test-1';

  function renderChannelOptions(selectedName) {
    var sel = selectedName || DEFAULT_CHANNEL;
    return ALERT_CHANNELS.map(function (ch) {
      var selected = ch.name === sel;
      return '<button class="channel-dropdown-item' + (selected ? ' is-selected' : '') + '" type="button" role="option"' +
          ' aria-selected="' + (selected ? 'true' : 'false') + '"' +
          ' data-channel-option="' + esc(ch.name) + '" data-channel-kind="' + ch.kind + '">' +
          '<span class="channel-dropdown-item-icon' + (ch.kind === 'agent' ? ' ic-agent' : '') + '" aria-hidden="true"></span>' +
          '<span class="channel-dropdown-item-name">' + esc(ch.name) + '</span>' +
        '</button>';
    }).join('');
  }

  /* 单条 automation 行：独立开关（默认 ON）+ 名称 + 独立频道下拉（默认推到 Alva 站内 channel）
     产品口径：有了 channel 后不连 social 也能在 Alva 站内收 Alerts；每条可单独设频道（Figma 29686:30891） */
  function renderAutomationRow(name) {
    return '<div class="alerts-automation-row">' +
        '<button type="button" class="switch on is-on" data-alerts-automation-switch role="switch" aria-checked="true"><span class="switch-thumb"></span></button>' +
        '<span class="alerts-automation-name">' + esc(name) + '</span>' +
        '<div class="channel-select-menu">' +
          '<button class="channel-select" type="button" data-channel-trigger aria-haspopup="listbox" aria-expanded="false">' +
            '<span class="channel-select-logo is-agent" data-channel-logo>' +
              '<img class="channel-select-logo-img" src="/alva-infant/logo-portrait.svg" alt="" />' +
              '<span class="channel-select-logo-icon"></span>' +
            '</span>' +
            '<span class="channel-select-name" data-channel-name>Alva</span>' +
            '<span class="channel-select-arrow" aria-hidden="true"></span>' +
          '</button>' +
          '<div class="channel-dropdown" data-channel-dropdown role="listbox" aria-hidden="true">' +
            '<div class="channel-dropdown-title">Send alerts to</div>' +
            renderChannelOptions('Alva') +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* Recent Alerts 卡片（mock，Figma 29686:30891）——正文可滚，footer 吸底靠数量撑出滚动 */
  function renderSignalCard() {
    return '<div class="alerts-signal-card">' +
        '<p class="alerts-signal-date">May 8, 12:00 PM &middot; ai-chip-supply-chain</p>' +
        '<p class="alerts-signal-headline"><strong>AMD to Entrust 2nm Production to Samsung Foundry Samsung Electronics has entered into substantive discussions with AMD</strong></p>' +
        '<ul class="alerts-signal-bullets">' +
          '<li>Top of basket: ALL (Allstate) holds #1 at Score 95 &mdash; ROE 39.5%, P/E 5.64; leadership in Insurance &mdash; Property &amp; Casualty continues.</li>' +
          '<li>New entries: BBVA (+7), PDD (+6), PBR (+3) rejoin the Top 20 on improved P/E and ROE reads.</li>' +
          '<li>Dropouts: TFC, SFNC fall out of Top 40 after D/E flags near 2.0 threshold.</li>' +
        '</ul>' +
      '</div>';
  }

  function render(host) {
    var title = host.getAttribute('title') || '';
    var freq = host.getAttribute('freq') || '';
    var lastUpdated = host.getAttribute('last-updated') || '';
    var owner = host.getAttribute('owner') || '';
    var ownerSeed = host.getAttribute('owner-seed') || owner;
    var views = host.getAttribute('views') || '';
    var remix = host.getAttribute('remix') || '';
    var alertsEnabled = host.hasAttribute('get-alerts')
      && host.getAttribute('get-alerts') !== 'false';
    var alertsLabel = host.getAttribute('alerts-label') || 'Subscribe';
    var alertsStartConnected = host.hasAttribute('alerts-connected')
      && host.getAttribute('alerts-connected') !== 'false';
    /* social 连接态：默认未连（显示 Connect Telegram/Discord 吸底区）；连了则仅剩 Unsubscribe（Figma 29686:30915） */
    var socialConnected = host.hasAttribute('social-connected')
      && host.getAttribute('social-connected') !== 'false';
    var comments = host.getAttribute('comments') || '';
    var description = host.getAttribute('description') || '';
    var creator = host.hasAttribute('creator')
      && host.getAttribute('creator') !== 'false';
    var builtOn = host.getAttribute('built-on') || '';
    var builtOnSeed = host.getAttribute('built-on-seed') || builtOn;
    var builtWith = host.getAttribute('built-with') || '';
    var builtWithSeed = host.getAttribute('built-with-seed') || builtWith;
    var builtWithAvatar = host.getAttribute('built-with-avatar') || '';
    var builtWithCreator = host.getAttribute('built-with-creator') || '';
    var builtWithCreatorAvatar = host.getAttribute('built-with-creator-avatar') || builtWithAvatar;
    var builtWithUpdated = host.getAttribute('built-with-updated') || '';
    var builtWithDesc = host.getAttribute('built-with-desc') || '';
    var builtWithTags = (host.getAttribute('built-with-tags') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var builtWithSocials = (host.getAttribute('built-with-socials') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var feeds = readFeeds(host);

    var creatorBlock = creator
      ? '<div class="pb-creator-actions">' +
          '<div class="settings-menu">' +
            '<button class="pb-creator-icon-btn" type="button" aria-label="Settings" data-creator-settings aria-haspopup="dialog" aria-expanded="false"><span class="pb-action-icon ic-settings"></span></button>' +
            '<div class="settings-popover" data-settings-popover role="dialog" aria-label="Setting" aria-hidden="true">' +
              '<div class="settings-popover-header">' +
                '<h2 class="settings-popover-title">Setting</h2>' +
                '<button class="settings-popover-close" type="button" aria-label="Close" data-settings-close><span class="settings-popover-close-icon"></span></button>' +
              '</div>' +
              '<div class="settings-field">' +
                '<label class="settings-field-label">Title</label>' +
                '<input class="settings-field-input" type="text" value="' + esc(title) + '" />' +
              '</div>' +
              '<div class="settings-field settings-field--textarea">' +
                '<label class="settings-field-label">Description</label>' +
                '<textarea class="settings-field-textarea">' + esc(description) + '</textarea>' +
              '</div>' +
              '<button class="settings-more" type="button" data-settings-more>' +
                '<span class="settings-more-label">More Settings</span>' +
                '<span class="settings-more-chev" aria-hidden="true"></span>' +
              '</button>' +
            '</div>' +
          '</div>' +
          '<div class="history-menu">' +
            '<button class="pb-creator-icon-btn" type="button" aria-label="History" data-creator-history aria-haspopup="dialog" aria-expanded="false"><span class="pb-action-icon ic-history"></span></button>' +
            '<div class="history-popover" data-history-popover role="dialog" aria-label="Version history" aria-hidden="true">' +
              renderHistory(buildHistoryEntries()) +
            '</div>' +
          '</div>' +
        '</div>'
      : '';

    var authorBlock = owner
      ? '<a class="pb-pill pb-pill--author" href="#user-profile" target="_top">' +
          '<img class="pb-meta-avatar" src="' + avatarUrl(ownerSeed) + '" alt="' + esc(owner) + '" />' +
          '<span>' + esc(owner) + '</span>' +
        '</a>'
      : '';

    var readmeModal = host.getAttribute('readme-modal') || '';
    var readmeBlock = readmeModal
      ? '<button class="pb-pill pb-pill--readme" type="button" data-readme-trigger>' +
          '<span class="pb-meta-icon ic-readme" aria-hidden="true"></span>' +
          '<span>README</span>' +
        '</button>'
      : '';

    var builtOnBlock = builtOn
      ? '<button class="pb-pill pb-pill--built-on" type="button" data-built-on-trigger>' +
          '<span class="pb-built-on-label">Built on:</span>' +
          '<img class="pb-built-on-avatar" src="' + avatarUrl(builtOnSeed) + '" alt="" />' +
          '<span class="pb-built-on-name">' + esc(builtOn) + '</span>' +
        '</button>'
      : '';

    var CDN = 'https://alva-ai-static.b-cdn.net/icons';
    var socialIcons = {
      discord: '<img src="' + CDN + '/logo-social-discord.svg" alt="" />',
      telegram: '<img src="/alva-infant/logo-social-telegram.svg" alt="" />',
      x: '<img src="' + CDN + '/logo-feed-x.svg" alt="" />',
      instagram: '<img src="' + CDN + '/logo-social-instagram.svg" alt="" />'
    };
    var builtWithSocialsHtml = builtWithSocials.map(function (k) {
      var icon = socialIcons[k] || '';
      if (!icon) return '';
      return '<span class="pb-bw-social" aria-label="' + esc(k) + '">' + icon + '</span>';
    }).join('');
    var builtWithTagsHtml = builtWithTags.map(function (tag) {
      return '<span class="pb-bw-tag">' + esc(tag) + '</span>';
    }).join('');
    var builtWithCard = (builtWithCreator || builtWithDesc)
      ? '<div class="pb-built-with-popover" data-built-with-popover role="tooltip" aria-hidden="true">' +
          '<div class="pb-bw-info">' +
            '<div class="pb-bw-header">' +
              '<h2 class="pb-bw-title">' + esc(builtWith) + '</h2>' +
              (builtWithUpdated ? '<span class="pb-bw-time">' + esc(builtWithUpdated) + '</span>' : '') +
            '</div>' +
            (builtWithDesc ? '<p class="pb-bw-desc">' + esc(builtWithDesc) + '</p>' : '') +
            (builtWithTagsHtml ? '<div class="pb-bw-tags">' + builtWithTagsHtml + '</div>' : '') +
          '</div>' +
          '<div class="pb-bw-divider"></div>' +
          '<div class="pb-bw-creator-row">' +
            '<div class="pb-bw-creator">' +
              '<img class="pb-bw-creator-avatar" src="' + esc(builtWithCreatorAvatar) + '" alt="" />' +
              '<div class="pb-bw-creator-text">' +
                '<div class="pb-bw-caps">Created by</div>' +
                '<div class="pb-bw-creator-name">' + esc(builtWithCreator || builtWith) + '</div>' +
              '</div>' +
            '</div>' +
            (builtWithSocialsHtml ? '<div class="pb-bw-socials">' + builtWithSocialsHtml + '</div>' : '') +
          '</div>' +
        '</div>'
      : '';
    var builtWithBlock = builtWith
      ? '<div class="pb-built-with-menu">' +
          '<button class="pb-pill pb-pill--built-on pb-pill--built-with" type="button" data-built-with-trigger>' +
            '<span class="pb-built-on-label">Built with:</span>' +
            '<img class="pb-built-on-avatar" src="' + esc(builtWithAvatar || avatarUrl(builtWithSeed)) + '" alt="" />' +
            '<span class="pb-built-on-name">' + esc(builtWith) + '</span>' +
          '</button>' +
          builtWithCard +
        '</div>'
      : '';

    var feedsCount = feeds.length;
    var statusParts = [];
    if (feedsCount) statusParts.push('<span>' + feedsCount + ' Automation' + (feedsCount > 1 ? 's' : '') + '</span>');
    if (freq) statusParts.push('<span>' + esc(freq) + ' ago</span>');
    var statusInner = '';
    for (var i = 0; i < statusParts.length; i++) {
      if (i > 0) statusInner += '<span class="pb-pill-sep" aria-hidden="true">•</span>';
      statusInner += statusParts[i];
    }
    var statusTooltip = '';
    var statusTag = feedsCount ? 'button' : 'span';
    var statusAttrs = feedsCount
      ? ' type="button" data-feeds-trigger aria-haspopup="menu" aria-expanded="false"'
      : '';
    var statusClasses = 'pb-pill pb-pill--status';
    var statusBlock = statusParts.length
      ? (feedsCount
          ? '<div class="feeds-menu">' +
              '<' + statusTag + ' class="' + statusClasses + '"' + statusAttrs + (lastUpdated && !feedsCount ? ' tabindex="0"' : '') + '>' +
                '<span class="pb-freq-dot" aria-hidden="true"></span>' +
                statusInner +
                statusTooltip +
              '</' + statusTag + '>' +
              '<div class="feeds-popover" data-feeds-popover role="menu" aria-hidden="true">' +
                renderFeeds(feeds, lastUpdated) +
              '</div>' +
            '</div>'
          : '<' + statusTag + ' class="' + statusClasses + '"' + (lastUpdated ? ' tabindex="0"' : '') + '>' +
              '<span class="pb-freq-dot" aria-hidden="true"></span>' +
              statusInner +
              statusTooltip +
            '</' + statusTag + '>')
      : '';

    var descBlock = description
      ? '<div class="pb-desc collapsed">' +
          '<span class="pb-desc-text">' + esc(description) + '</span>' +
          '<button class="pb-desc-toggle" type="button" aria-expanded="false">Show more</button>' +
        '</div>'
      : '';

    host.innerHTML =
      '<div class="pb-top-bar">' +
        '<div class="pb-top">' +
          '<div class="pb-top-left">' +
            '<h1 class="pb-title">' + esc(title) + '</h1>' +
            creatorBlock +
          '</div>' +
          '<div class="pb-actions">' +
            '<div class="share-menu">' +
              '<button class="pb-action pb-action--icon-only" type="button" aria-label="Share" data-share-trigger aria-haspopup="dialog" aria-expanded="false"><span class="pb-action-icon ic-share"></span></button>' +
              '<div class="share-popover" data-share-popover role="dialog" aria-label="Share" aria-hidden="true">' +
                '<div class="share-popover-titlebar">' +
                  '<h2 class="share-popover-title">Share</h2>' +
                  '<button type="button" class="share-popover-close" data-share-close aria-label="Close"></button>' +
                '</div>' +
                '<div class="share-popover-group" role="radiogroup" aria-label="Share visibility">' +
                  '<button class="share-popover-row is-disabled" type="button" role="radio" aria-checked="false" aria-disabled="true" disabled data-share-option="private">' +
                    '<span class="share-popover-icon-badge"><span class="share-popover-icon ic-hide"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Private</span>' +
                      '<span class="share-popover-row-desc">Visible to yourself only.</span>' +
                    '</span>' +
                    '<span class="share-popover-pro">Pro</span>' +
                  '</button>' +
                  '<button class="share-popover-row is-selected" type="button" role="radio" aria-checked="true" data-share-option="public">' +
                    '<span class="share-popover-icon-badge is-filled"><span class="share-popover-icon ic-global"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Public</span>' +
                      '<span class="share-popover-row-desc">Anyone can access by link.</span>' +
                      '<span class="share-popover-row-note">Share to earn up to 3,000 credits/week.</span>' +
                    '</span>' +
                    '<span class="share-popover-check" aria-hidden="true"></span>' +
                  '</button>' +
                  '<button class="share-popover-row is-disabled" type="button" role="radio" aria-checked="false" aria-disabled="true" disabled data-share-option="sealed">' +
                    '<span class="share-popover-icon-badge"><span class="share-popover-icon ic-lightning"></span></span>' +
                    '<span class="share-popover-row-text">' +
                      '<span class="share-popover-row-title">Sealed</span>' +
                      '<span class="share-popover-row-desc">Other users need to pay credits to read.</span>' +
                      '<span class="share-popover-row-note">Share to earn up to 3,000 credits/week.</span>' +
                    '</span>' +
                    '<span class="share-popover-pro">Pro</span>' +
                  '</button>' +
                '</div>' +
                '<button class="share-popover-copy" type="button" data-share-copy>' +
                  '<span class="share-popover-copy-icon" data-share-copy-icon></span>' +
                  '<span data-share-copy-label>Copy Link</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
            '<div class="pb-action pb-action--static" aria-label="Views">' +
              '<span class="pb-action-icon ic-show"></span>' +
              (views ? '<span class="pb-action-count">' + esc(views) + '</span>' : '') +
            '</div>' +
            '<button class="pb-action" type="button" aria-label="Comments" data-discuss-trigger aria-pressed="false"><span class="pb-action-icon ic-chat"></span>' + (comments ? '<span class="pb-action-count">' + esc(comments) + '</span>' : '') + '</button>' +
            '<div class="remix-menu pb-remix-wrap">' +
              '<button class="pb-remix-btn" type="button" aria-label="Remix" data-remix-trigger aria-haspopup="dialog" aria-expanded="false">' +
                '<span class="pb-remix-label">Remix</span>' +
                (remix ? '<span class="pb-remix-count">' + esc(remix) + '</span>' : '') +
              '</button>' +
              '<div class="remix-popover" data-remix-popover role="dialog" aria-label="Remix this Playbook" aria-hidden="true">' +
                '<div class="remix-popover-titlebar">' +
                  '<h2 class="remix-popover-title">Remix this Playbook</h2>' +
                  '<button type="button" class="remix-popover-close" data-remix-close aria-label="Close"></button>' +
                '</div>' +
                '<p class="remix-popover-desc">Create your own version — customize the data, layout, and style to fit your needs. Your remix will be published under your account.</p>' +
                '<button class="remix-popover-cta" type="button" data-remix-cta>' +
                  '<span class="remix-popover-cta-icon"></span>' +
                  '<span>Remix</span>' +
                '</button>' +
                '<div class="remix-popover-agent">' +
                  '<div class="remix-popover-divider">' +
                    '<div class="remix-popover-divider-line"></div>' +
                    '<button class="remix-popover-agent-toggle" type="button" data-remix-agent-toggle aria-expanded="false">' +
                      '<span>Or use your own agent</span>' +
                      '<span class="remix-popover-agent-arrow"></span>' +
                    '</button>' +
                    '<div class="remix-popover-divider-line"></div>' +
                  '</div>' +
                  '<div class="remix-popover-agent-body">' +
                    '<pre class="remix-popover-prompt" data-remix-prompt>' + esc(buildExternalRemixPrompt(title)) + '</pre>' +
                    '<button class="remix-popover-copy" type="button" data-remix-copy>' +
                      '<span class="remix-popover-copy-icon" data-remix-copy-icon></span>' +
                      '<span data-remix-copy-label>Copy</span>' +
                    '</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            // Subscribe 按钮所有 playbook 都有；弹窗/铃铛只在有推送（get-alerts）时出现
            '<div class="alerts-menu">' +
              '<button class="pb-alerts-btn' + (alertsStartConnected ? ' is-on' : '') + '" type="button" aria-label="' + (alertsStartConnected ? 'Subscribed' : esc(alertsLabel)) + '" data-alerts-trigger' + (alertsEnabled ? ' aria-haspopup="dialog" aria-expanded="false"' : '') + '>' +
                (alertsEnabled ? '<span class="pb-alerts-bell" aria-hidden="true"></span>' : '') +
                '<span class="pb-alerts-label">' + (alertsStartConnected ? 'Subscribed' : esc(alertsLabel)) + '</span>' +
                '<span class="pb-alerts-count">16</span>' +
              '</button>' +
              (alertsEnabled
                // Figma 29686:30891/30915：顶部不吸顶，标题 + A&C + Recent Alerts 一起滚动，仅 footer 吸底
                ? '<div class="alerts-popover' + (socialConnected ? ' is-agent-connected' : '') + '" data-alerts-popover role="dialog" aria-label="' + esc(alertsLabel) + '" aria-hidden="true">' +
                    // 可滚区：标题栏 + Alerts & Channels + Recent Alerts 全部一起滚动
                    '<div class="alerts-popover-body">' +
                      '<div class="alerts-popover-titlebar">' +
                        '<p class="alerts-popover-title">Subscribe</p>' +
                        '<button type="button" class="alerts-popover-close" data-alerts-close aria-label="Close"></button>' +
                      '</div>' +
                      '<div class="alerts-connected-section">' +
                        '<span class="alerts-connected-head-label">Alerts &amp; Channels</span>' +
                        '<div class="alerts-automations-list" data-alerts-automations>' +
                          renderAutomationRow('ai-chip-supply-chain') +
                          renderAutomationRow('space-rotation-prices') +
                        '</div>' +
                      '</div>' +
                      '<div class="alerts-signals-section">' +
                        '<p class="alerts-signals-title">Recent Alerts</p>' +
                        '<div class="alerts-signals-list">' +
                          renderSignalCard() + renderSignalCard() + renderSignalCard() +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                    // 吸底：未连 social 显示 Connect 区 + 分隔线；Unsubscribe 恒在（文字链）
                    '<div class="alerts-popover-foot">' +
                      '<div class="alerts-connect" data-alerts-connect>' +
                        '<p class="alerts-connect-title">Connect Agents to Get Notified</p>' +
                        '<div class="alerts-connect-btns">' +
                          '<button type="button" class="alerts-connect-btn is-telegram" data-alerts-connect-social="telegram"><img class="alerts-connect-btn-icon" src="/alva-infant/logo-im-telegram.svg" alt="" /><span>Telegram</span></button>' +
                          '<button type="button" class="alerts-connect-btn is-discord" data-alerts-connect-social="discord"><img class="alerts-connect-btn-icon" src="/alva-infant/logo-im-discord.svg" alt="" /><span>Discord</span></button>' +
                          '<button type="button" class="alerts-connect-btn is-imessage" data-alerts-connect-social="imessage"><img class="alerts-connect-btn-icon" src="/alva-infant/logo-im-imessage.svg" alt="" /><span>iMessage</span></button>' +
                        '</div>' +
                      '</div>' +
                      '<div class="alerts-foot-divider" data-alerts-connect-divider aria-hidden="true"></div>' +
                      '<button type="button" class="alerts-unsubscribe" data-alerts-unsubscribe>Unsubscribe</button>' +
                    '</div>' +
                  '</div>'
                : '') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<section class="playbook-info">' +
        '<div class="pb-meta">' +
          authorBlock +
          readmeBlock +
          statusBlock +
          builtOnBlock +
          builtWithBlock +
        '</div>' +
        descBlock +
      '</section>';
  }

  function setupBuiltWithHover(host) {
    var trigger = host.querySelector('[data-built-with-trigger]');
    var popover = host.querySelector('[data-built-with-popover]');
    if (!trigger || !popover) return;
    var hideTimer = null;
    function show() {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
    }
    function hide() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
    }
    function delayedHide() {
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(hide, 160);
    }
    trigger.addEventListener('mouseenter', show);
    trigger.addEventListener('mouseleave', delayedHide);
    popover.addEventListener('mouseenter', show);
    popover.addEventListener('mouseleave', delayedHide);
    trigger.addEventListener('focus', show);
    trigger.addEventListener('blur', delayedHide);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      if (hideTimer) clearTimeout(hideTimer);
    });
  }

  function setupSettingsPopover(host) {
    var trigger = host.querySelector('[data-creator-settings]');
    var popover = host.querySelector('[data-settings-popover]');
    if (!trigger || !popover) return;
    var closeBtn = popover.querySelector('[data-settings-close]');

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        close();
      });
    }

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });
  }

  function setupHistoryPopover(host) {
    var trigger = host.querySelector('[data-creator-history]');
    var popover = host.querySelector('[data-history-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });
  }

  function setupReadmeTrigger(host) {
    var btn = host.querySelector('[data-readme-trigger]');
    if (!btn) return;
    var modalId = host.getAttribute('readme-modal') || '';
    btn.addEventListener('click', function () {
      host.dispatchEvent(new CustomEvent('playbook-readme-click', {
        bubbles: true,
        detail: { modalId: modalId }
      }));
    });
  }

  function setupDescToggle(host) {
    var desc = host.querySelector('.pb-desc');
    if (!desc) return;
    var text = desc.querySelector('.pb-desc-text');
    var toggle = desc.querySelector('.pb-desc-toggle');
    if (!text || !toggle) return;

    function checkOverflow() {
      var wasCollapsed = desc.classList.contains('collapsed');
      desc.classList.add('collapsed');
      var overflows = text.scrollWidth - text.clientWidth > 1;
      if (!wasCollapsed) desc.classList.remove('collapsed');
      desc.classList.toggle('has-overflow', overflows);
    }

    checkOverflow();
    var onResize = function () { checkOverflow(); };
    window.addEventListener('resize', onResize);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      window.removeEventListener('resize', onResize);
    });

    toggle.addEventListener('click', function () {
      var collapsed = desc.classList.toggle('collapsed');
      toggle.textContent = collapsed ? 'Show more' : 'Show less';
      toggle.setAttribute('aria-expanded', String(!collapsed));
    });
  }

  function registerPopover(host, closeFn) {
    host._popovers = host._popovers || [];
    host._popovers.push(closeFn);
  }
  function closeOtherPopovers(host, self) {
    (host._popovers || []).forEach(function (fn) { if (fn !== self) fn(); });
  }

  function setupFeedsPopover(host) {
    var trigger = host.querySelector('[data-feeds-trigger]');
    var popover = host.querySelector('[data-feeds-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

    // Hover 自动浮现：指针进入 trigger 或 popover 即展开；离开后短延迟收起，
    // 用延迟兜底跨越 trigger→popover 之间 6px 间隙时的瞬时 mouseleave，避免闪烁。
    var hideTimer = null;
    function cancelHide() {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    }
    function scheduleHide() {
      cancelHide();
      hideTimer = setTimeout(function () { hideTimer = null; close(); }, 140);
    }
    trigger.addEventListener('mouseenter', function () { cancelHide(); open(); });
    trigger.addEventListener('mouseleave', scheduleHide);
    popover.addEventListener('mouseenter', cancelHide);
    popover.addEventListener('mouseleave', scheduleHide);

    // 点按/键盘仍可展开（触屏 / Enter），收起交给移开指针、外部点击或 Esc。
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      cancelHide();
      open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
      cancelHide();
    });

    function syncBulkButton() {
      var bulk = popover.querySelector('[data-feeds-bulk]');
      if (!bulk) return;
      var rows = popover.querySelectorAll('.feeds-popover-row[data-feed]');
      if (!rows.length) return;
      var allPaused = true;
      rows.forEach(function (r) { if (!r.classList.contains('is-paused')) allPaused = false; });
      bulk.classList.toggle('is-paused', allPaused);
      bulk.setAttribute('aria-pressed', allPaused ? 'true' : 'false');
      var label = bulk.querySelector('.feeds-popover-bulk-label');
      var icon = bulk.querySelector('.feeds-popover-bulk-icon');
      if (label) label.textContent = allPaused ? 'Resume all' : 'Pause all';
      if (icon) {
        icon.classList.toggle('ic-play', allPaused);
        icon.classList.toggle('ic-pause', !allPaused);
      }
    }

    function setRowPaused(row, paused) {
      row.classList.toggle('is-paused', paused);
      var lastCell = row.querySelector('.feeds-popover-cell-last');
      if (lastCell) {
        lastCell.textContent = paused ? 'Paused' : (lastCell.getAttribute('data-last-run') || '');
      }
      var toggleBtn = row.querySelector('[data-feed-toggle]');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
        toggleBtn.setAttribute('aria-label', paused ? 'Resume' : 'Pause');
        toggleBtn.setAttribute('title', paused ? 'Resume' : 'Pause');
        var ti = toggleBtn.querySelector('.feeds-popover-row-toggle-icon');
        if (ti) {
          ti.classList.toggle('ic-play', paused);
          ti.classList.toggle('ic-pause', !paused);
        }
      }
    }

    popover.querySelectorAll('.feeds-popover-row[data-feed]').forEach(function (row) {
      var activate = function () {
        close();
        host.dispatchEvent(new CustomEvent('playbook-feed-click', {
          bubbles: true,
          detail: { id: row.getAttribute('data-feed') }
        }));
      };
      row.addEventListener('click', activate);
      row.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });

      var toggleBtn = row.querySelector('[data-feed-toggle]');
      if (toggleBtn) {
        var togglePause = function (e) {
          if (e) { e.stopPropagation(); e.preventDefault(); }
          var nextPaused = !row.classList.contains('is-paused');
          setRowPaused(row, nextPaused);
          syncBulkButton();
          host.dispatchEvent(new CustomEvent('playbook-feed-pause-toggle', {
            bubbles: true,
            detail: { id: row.getAttribute('data-feed'), paused: nextPaused }
          }));
        };
        toggleBtn.addEventListener('click', togglePause);
        toggleBtn.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') togglePause(e);
        });
      }
    });

    var bulkBtn = popover.querySelector('[data-feeds-bulk]');
    if (bulkBtn) {
      bulkBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var rows = popover.querySelectorAll('.feeds-popover-row[data-feed]');
        var anyActive = false;
        rows.forEach(function (r) { if (!r.classList.contains('is-paused')) anyActive = true; });
        var nextPaused = anyActive; // if any active → pause all; else resume all
        rows.forEach(function (r) { setRowPaused(r, nextPaused); });
        syncBulkButton();
        host.dispatchEvent(new CustomEvent('playbook-feeds-pause-all', {
          bubbles: true,
          detail: { paused: nextPaused }
        }));
      });
    }

    syncBulkButton();

    var viewAll = popover.querySelector('.feeds-popover-viewall');
    if (viewAll) {
      var go = function () {
        close();
        host.dispatchEvent(new CustomEvent('playbook-feeds-viewall', { bubbles: true }));
      };
      viewAll.addEventListener('click', go);
      viewAll.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
      });
    }
  }

  function setupRemixPopover(host) {
    var trigger = host.querySelector('[data-remix-trigger]');
    var popover = host.querySelector('[data-remix-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.classList.remove('agent-open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
      var agentToggleEl = popover.querySelector('[data-remix-agent-toggle]');
      if (agentToggleEl) agentToggleEl.setAttribute('aria-expanded', 'false');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });

    var remixCloseBtn = popover.querySelector('[data-remix-close]');
    if (remixCloseBtn) {
      remixCloseBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        close();
      });
    }

    var agentToggle = popover.querySelector('[data-remix-agent-toggle]');
    if (agentToggle) {
      agentToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var opened = popover.classList.toggle('agent-open');
        agentToggle.setAttribute('aria-expanded', String(opened));
      });
    }

    var cta = popover.querySelector('[data-remix-cta]');
    if (cta) {
      cta.addEventListener('click', function (e) {
        e.stopPropagation();
        var title = host.getAttribute('title') || '';
        var prompt = buildRemixPrompt(title);
        try {
          window.parent.postMessage({ type: 'alva:remix', prompt: prompt, title: title }, '*');
        } catch (_) {}
        close();
      });
    }

    var copyBtn = popover.querySelector('[data-remix-copy]');
    var promptEl = popover.querySelector('[data-remix-prompt]');
    if (copyBtn && promptEl) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var text = promptEl.textContent || '';
        var icon = copyBtn.querySelector('[data-remix-copy-icon]');
        var label = copyBtn.querySelector('[data-remix-copy-label]');
        var ok = function () {
          if (icon) icon.classList.add('copied');
          if (label) label.textContent = 'Copied';
          setTimeout(function () {
            if (icon) icon.classList.remove('copied');
            if (label) label.textContent = 'Copy';
          }, 2000);
        };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(ok).catch(function () {});
          }
        } catch (_) {}
      });
    }
  }

  function setupDiscussTrigger(host) {
    var btn = host.querySelector('[data-discuss-trigger]');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      host.dispatchEvent(new CustomEvent('playbook-discuss-click', { bubbles: true }));
    });
  }

  function updateDiscussActive(host) {
    var btn = host.querySelector('[data-discuss-trigger]');
    if (!btn) return;
    var active = host.getAttribute('discuss-active') === 'true';
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  }

  function setupSharePopover(host) {
    var trigger = host.querySelector('[data-share-trigger]');
    var popover = host.querySelector('[data-share-popover]');
    if (!trigger || !popover) return;

    function close() {
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
    }
    registerPopover(host, close);

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (popover.classList.contains('open')) close(); else open();
    });

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target) || trigger.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });

    var shareCloseBtn = popover.querySelector('[data-share-close]');
    if (shareCloseBtn) {
      shareCloseBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        close();
      });
    }

    var rows = popover.querySelectorAll('[data-share-option]');
    rows.forEach(function (row) {
      row.addEventListener('click', function (e) {
        e.stopPropagation();
        rows.forEach(function (r) {
          r.classList.remove('is-selected');
          r.setAttribute('aria-checked', 'false');
          var badge = r.querySelector('.share-popover-icon-badge');
          if (badge) badge.classList.remove('is-filled');
        });
        row.classList.add('is-selected');
        row.setAttribute('aria-checked', 'true');
        var badge = row.querySelector('.share-popover-icon-badge');
        if (badge) badge.classList.add('is-filled');
      });
    });

    var copyBtn = popover.querySelector('[data-share-copy]');
    if (copyBtn) {
      copyBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var icon = copyBtn.querySelector('[data-share-copy-icon]');
        var label = copyBtn.querySelector('[data-share-copy-label]');
        var ok = function () {
          if (icon) icon.classList.add('copied');
          if (label) label.textContent = 'Copied';
          setTimeout(function () {
            if (icon) icon.classList.remove('copied');
            if (label) label.textContent = 'Copy Link';
          }, 2000);
        };
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href).then(ok).catch(function () {});
          }
        } catch (_) {}
      });
    }
  }

  function setupAlertsPopover(host) {
    var alertsBtn = host.querySelector('[data-alerts-trigger]');
    if (!alertsBtn) return;
    var alertsBtnLabel = alertsBtn.querySelector('.pb-alerts-label');
    var popover = host.querySelector('[data-alerts-popover]');

    var setSubscribed = function (on) {
      alertsBtn.classList.toggle('is-on', on);
      alertsBtn.setAttribute('aria-label', on ? 'Subscribed' : 'Subscribe');
      if (alertsBtnLabel) alertsBtnLabel.textContent = on ? 'Subscribed' : 'Subscribe';
    };

    // 无推送 playbook：Subscribe ↔ Subscribed 直接切换，无弹层无铃铛
    if (!popover) {
      alertsBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        setSubscribed(!alertsBtn.classList.contains('is-on'));
      });
      return;
    }

    // 有推送 playbook：每条 automation 独立开关（各自推送频道）；铃铛 muted = 全部关闭；退订走 Unsubscribe
    var getRowSwitches = function () {
      return Array.prototype.slice.call(popover.querySelectorAll('[data-alerts-automation-switch]'));
    };
    var updateBell = function () {
      var anyOn = getRowSwitches().some(function (s) {
        return s.classList.contains('on') || s.classList.contains('is-on');
      });
      alertsBtn.classList.toggle('is-muted', !anyOn);
    };
    var setAllRows = function (on) {
      getRowSwitches().forEach(function (s) {
        s.classList.toggle('on', on);
        s.classList.toggle('is-on', on);
        s.setAttribute('aria-checked', on ? 'true' : 'false');
      });
      updateBell();
    };

    function closeAllChannelDropdowns() {
      Array.prototype.slice.call(popover.querySelectorAll('[data-channel-dropdown]')).forEach(function (dd) {
        dd.classList.remove('open');
        dd.setAttribute('aria-hidden', 'true');
      });
      Array.prototype.slice.call(popover.querySelectorAll('[data-channel-trigger]')).forEach(function (t) {
        t.setAttribute('aria-expanded', 'false');
      });
    }

    function close() {
      closeAllChannelDropdowns();
      popover.classList.remove('open');
      popover.setAttribute('aria-hidden', 'true');
      if (alertsBtn) {
        alertsBtn.setAttribute('aria-expanded', 'false');
        alertsBtn.classList.remove('is-open');
      }
    }
    function open() {
      closeOtherPopovers(host, close);
      popover.classList.add('open');
      popover.setAttribute('aria-hidden', 'false');
      if (alertsBtn) {
        alertsBtn.setAttribute('aria-expanded', 'true');
        alertsBtn.classList.add('is-open');
      }
    }
    registerPopover(host, close);

    alertsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!alertsBtn.classList.contains('is-on')) {
        // 首次订阅：置 Subscribed + 所有 automation 默认推到 Alva（全开）+ 弹出弹层
        setSubscribed(true);
        setAllRows(true);
        open();
      } else if (popover.classList.contains('open')) {
        close();
      } else {
        open();
      }
    });
    // 标题栏 × 关闭
    var closeBtn = popover.querySelector('[data-alerts-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        close();
      });
    }

    // Unsubscribe：退订（按钮回 Subscribe，automations 全关）后收起弹层
    var unsubscribeBtn = popover.querySelector('[data-alerts-unsubscribe]');
    if (unsubscribeBtn) {
      unsubscribeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        setSubscribed(false);
        setAllRows(false);
        close();
      });
    }

    // Connect Telegram / Discord → 连接 social 后切「已连接」态（隐藏 Connect 区，仅剩 Unsubscribe）
    Array.prototype.slice.call(popover.querySelectorAll('[data-alerts-connect-social]')).forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (btn.getAttribute('data-alerts-connect-social') === 'telegram') {
          try { window.open('https://t.me/alva_ai_bot', '_blank', 'noopener'); } catch (_) {}
        }
        popover.classList.add('is-agent-connected');
      });
    });

    // 每行频道选择：各自独立展开 / 选中回填（互斥展开，同一时刻只开一个）
    Array.prototype.slice.call(popover.querySelectorAll('.channel-select-menu')).forEach(function (menu) {
      var trigger = menu.querySelector('[data-channel-trigger]');
      var dropdown = menu.querySelector('[data-channel-dropdown]');
      if (!trigger || !dropdown) return;
      var channelName = menu.querySelector('[data-channel-name]');
      var channelLogo = menu.querySelector('[data-channel-logo]');
      trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        var wasOpen = dropdown.classList.contains('open');
        closeAllChannelDropdowns();
        if (!wasOpen) {
          dropdown.classList.add('open');
          dropdown.setAttribute('aria-hidden', 'false');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
      Array.prototype.slice.call(dropdown.querySelectorAll('[data-channel-option]')).forEach(function (opt) {
        opt.addEventListener('click', function (e) {
          e.stopPropagation();
          Array.prototype.slice.call(dropdown.querySelectorAll('[data-channel-option]')).forEach(function (o) {
            o.classList.toggle('is-selected', o === opt);
            o.setAttribute('aria-selected', o === opt ? 'true' : 'false');
          });
          if (channelName) channelName.textContent = opt.getAttribute('data-channel-option');
          if (channelLogo) channelLogo.classList.toggle('is-agent', opt.getAttribute('data-channel-kind') === 'agent');
          closeAllChannelDropdowns();
        });
      });
    });
    // 点弹层空白处只收起频道下拉，不关弹层（trigger/option/switch 均 stopPropagation）
    popover.addEventListener('click', function () { closeAllChannelDropdowns(); });

    // 每行 automation 开关：独立切换 + 同步铃铛（不再有主开关，铃铛跟随「是否还有开着的行」）
    getRowSwitches().forEach(function (rowSwitch) {
      rowSwitch.addEventListener('click', function (e) {
        e.stopPropagation();
        var on = !(rowSwitch.classList.contains('on') || rowSwitch.classList.contains('is-on'));
        rowSwitch.classList.toggle('on', on);
        rowSwitch.classList.toggle('is-on', on);
        rowSwitch.setAttribute('aria-checked', on ? 'true' : 'false');
        updateBell();
      });
    });
    // 初始态：已订阅 → 保持默认全开；未订阅 → 全关且铃铛静音（首次点 Subscribe 再全开）
    if (alertsBtn.classList.contains('is-on')) updateBell();
    else setAllRows(false);

    var onDocClick = function (e) {
      if (!popover.classList.contains('open')) return;
      if (popover.contains(e.target)) return;
      if (alertsBtn && alertsBtn.contains(e.target)) return;
      close();
    };
    var onKeydown = function (e) { if (e.key === 'Escape') close(); };
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKeydown);
    host._pbHeaderCleanup = (host._pbHeaderCleanup || []).concat(function () {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKeydown);
    });
  }

  class PlaybookHeader extends HTMLElement {
    static get observedAttributes() { return ['discuss-active']; }
    attributeChangedCallback(name) {
      if (name === 'discuss-active' && this._pbHeaderMounted) updateDiscussActive(this);
    }
    connectedCallback() {
      if (this._pbHeaderMounted) return;
      this._pbHeaderMounted = true;
      // connectedCallback can fire before child <script type="application/json">
      // nodes are parsed (when the element JS is loaded inline in <head>, the
      // parser upgrades the element on its open tag before reading children).
      // Defer mount to the next tick so we can read the feeds JSON child.
      var self = this;
      var mount = function () {
        render(self);
        setupDescToggle(self);
        setupFeedsPopover(self);
        setupRemixPopover(self);
        setupAlertsPopover(self);
        setupSharePopover(self);
        setupSettingsPopover(self);
        setupHistoryPopover(self);
        setupReadmeTrigger(self);
        setupBuiltWithHover(self);
        setupDiscussTrigger(self);
        updateDiscussActive(self);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
      } else {
        Promise.resolve().then(mount);
      }
    }
    disconnectedCallback() {
      (this._pbHeaderCleanup || []).forEach(function (fn) { try { fn(); } catch (_) {} });
      this._pbHeaderCleanup = [];
    }
  }

  customElements.define('playbook-header', PlaybookHeader);
})();

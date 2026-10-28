/* Setup screens reproduce the current Figma onboarding frames.
 * Real authentication, broker access and OS permission requests are simulated.
 */
const ASSETS = {
  logo: '12552:200754',
  monochromeLogo: 'Alva / Monochrome',
  google: 'I12552:200758;23386:4239;23391:4519',
  apple: 'I12552:200759;23386:4239;23391:4519',
  discord: 'I12552:200761;23386:4239;23391:4519',
  x: 'I12552:200762;23386:4239;23391:4519',
  telegram: 'I12552:200763;23386:4239;23391:4519',
  back: 'I12552:200909;3931:33522;12552:200937;4029:31573',
  importX: 'I12552:200915;9170:48523',
  notification: '12684:225224',
};
const PEOPLE = [
  { id: 'gavin', name: 'Gavin Baker', role: 'Managing Partner & CIO, Atreides', avatar: 'I12552:200919;1437:30822;12552:200944' },
  { id: 'satya', name: 'Satya Nadella', role: 'Chairman & CEO, Microsoft', avatar: 'I12552:200921;1437:30822;12552:200956' },
  { id: 'sam', name: 'Sam Altman', role: 'Co-founder, OpenAI', avatar: 'I12552:200923;1437:30822;12552:200968' },
  { id: 'maya', name: 'Maya Reynolds', role: '@maya', avatar: 'I12552:200925;1437:30822;12552:200980' },
  { id: 'warren', name: 'Warren Buffett', role: 'Chairman & CEO, Berkshire Hathaway', avatar: 'I12552:200927;1437:30822;12552:200992' },
  { id: 'chamath', name: 'Chamath Palihapitiya', role: 'Founder & CEO, Social Capital', avatar: 'I12552:200929;1437:30822;12552:201004' },
  { id: 'yggyll', name: 'YGGYLL', role: '@yggyll', avatar: 'I12552:200931;1437:30822;12552:201016' },
];
const BROKERS = [
  { id: 'alpaca', name: 'Alpaca', logo: 'I12552:201995;9170:48622' },
  { id: 'robinhood', name: 'Robinhood', logo: 'I12552:201996;9170:48632' },
  { id: 'interactive-brokers', name: 'Interactive Brokers', logo: 'I12552:201997;9170:48645', beta: true },
  { id: 'webull', name: 'Webull', logo: 'I12552:201998;9170:48660' },
];
const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function image(api, id, className = '', alt = '') {
  return `<img class="${className}" src="${escape(api.asset(id))}" alt="${escape(alt)}" draggable="false">`;
}
function brandImage(api, className = '', alt = 'Alva') {
  const source = api.asset(ASSETS.monochromeLogo) || new URL('./assets/alva-monochrome.svg', import.meta.url).href;
  return `<img class="${className}" src="${escape(source)}" alt="${escape(alt)}" draggable="false">`;
}
function topbar(api, back, next) {
  return `<header class="setup-topbar">${back ? `<button type="button" class="setup-back" data-action="back" aria-label="Back">${image(api, ASSETS.back)}</button>` : ''}${next ? '<button type="button" class="setup-skip" data-action="skip">Skip</button>' : ''}</header>`;
}
function heading(title, description) {
  return `<div class="setup-heading"><h1>${title}</h1><p>${description}</p></div>`;
}
function navigation(root, api, back, next) {
  root.querySelector('[data-action="back"]')?.addEventListener('click', () => api.go(back));
  root.querySelector('[data-action="skip"]')?.addEventListener('click', () => api.go(next));
  root.querySelector('[data-action="next"]')?.addEventListener('click', () => api.go(next));
}

function renderLogin(api) {
  const root = document.createElement('section');
  root.className = 'setup-page setup-login';
  root.setAttribute('aria-label', 'Log in to Alva');
  root.innerHTML = `${topbar(api)}
    <div class="setup-login-body">
      <div class="setup-login-main">
        <div class="setup-login-heading">
          ${image(api, ASSETS.logo, 'setup-login-logo', 'Alva')}
          <div><h1>Log in to Alva</h1><p>Login to build, remix, and trade.</p></div>
        </div>
        <button class="setup-login-option" type="button" data-provider="Google">${image(api, ASSETS.google)}<span>Sign in with Google</span></button>
        <button class="setup-login-option" type="button" data-provider="Apple">${image(api, ASSETS.apple)}<span>Sign in with Apple</span></button>
        <div class="setup-login-social">
          ${['discord', 'x', 'telegram'].map(key => `<button class="setup-login-option" type="button" data-provider="${key}" aria-label="Sign in with ${key === 'x' ? 'X' : key[0].toUpperCase() + key.slice(1)}">${image(api, ASSETS[key])}</button>`).join('')}
        </div>
        <div class="setup-login-divider"><span></span><span>or</span><span></span></div>
        <button class="setup-login-option setup-email" type="button" data-provider="Email">Login with Email</button>
      </div>
      <p class="setup-login-terms">By signing in, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></p>
    </div>`;
  root.querySelectorAll('[data-provider]').forEach(button => button.addEventListener('click', () => {
    api.state.provider = button.dataset.provider;
    api.go('intro');
  }));
  return root;
}

function renderPeople(api) {
  api.state.following ||= new Set();
  const root = document.createElement('section');
  root.className = 'setup-page setup-people';
  root.setAttribute('aria-label', 'Follow people you trust.');
  root.innerHTML = `${topbar(api, 'intro', 'bookmark')}
    <div class="setup-people-scroll">
      <div class="setup-people-header">
        ${heading('Follow people you trust.', 'Get their next thesis and its latest signals as soon as they share it.')}
        <div class="setup-import">
          ${image(api, ASSETS.importX, 'setup-import-icon')}
          <div class="setup-import-copy"><strong>Import from X</strong><span>Bring in people you already follow</span></div>
          <button class="setup-import-button" type="button" data-action="import">Connect</button>
        </div>
      </div>
      <div class="setup-or-divider"><span></span><span>or</span><span></span></div>
      <div class="setup-people-list">
        ${PEOPLE.map(person => `<div class="setup-person" data-person="${person.id}">
          ${image(api, person.avatar, 'setup-avatar', person.name)}
          <div class="setup-person-copy"><strong>${escape(person.name)}</strong><span>${escape(person.role)}</span></div>
          <button class="setup-follow" type="button" data-follow="${person.id}" aria-label="Follow ${escape(person.name)}">Follow</button>
        </div>`).join('')}
      </div>
    </div>
    <footer class="setup-dock setup-people-dock"><p class="setup-selection-count" aria-live="polite">0 selected</p><button class="setup-next" data-action="next" type="button" disabled>Next</button></footer>`;
  const update = () => {
    root.querySelectorAll('[data-follow]').forEach(button => {
      const selected = api.state.following.has(button.dataset.follow);
      button.textContent = selected ? 'Following' : 'Follow';
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
      const person = PEOPLE.find(p => p.id === button.dataset.follow);
      button.setAttribute('aria-label', `${selected ? 'Unfollow' : 'Follow'} ${person.name}`);
    });
    const count = api.state.following.size;
    root.querySelector('.setup-selection-count').textContent = `${count} selected`;
    root.querySelector('[data-action="next"]').disabled = count === 0;
    const connect = root.querySelector('[data-action="import"]');
    connect.textContent = api.state.xImported ? 'Connected' : 'Connect';
    connect.classList.toggle('is-connected', !!api.state.xImported);
    root.querySelector('.setup-import-copy strong').textContent = api.state.xImported ? 'Following from X' : 'Import from X';
  };
  root.querySelectorAll('[data-follow]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.follow;
    api.state.following.has(key) ? api.state.following.delete(key) : api.state.following.add(key);
    update();
  }));
  root.querySelector('[data-action="import"]').addEventListener('click', () => {
    if (api.state.xImported) { api.toast('Your X connections are up to date.'); return; }
    api.sheet({title: 'Import from X', body: 'Bring in people you already follow. This preview simulates importing your connections.', actions: [
      {label: 'Cancel', onClick() {}},
      {label: 'Connect', primary: true, onClick() {
        api.state.xImported = true;
        ['gavin', 'satya', 'sam'].forEach(key => api.state.following.add(key));
        update();
      }},
    ]});
  });
  navigation(root, api, 'intro', 'bookmark');
  update();
  return root;
}

function renderPortfolio(api) {
  api.state.connections ||= new Set();
  const root = document.createElement('section');
  root.className = 'setup-page setup-portfolio';
  root.setAttribute('aria-label', 'Connect your portfolio');
  root.innerHTML = `${topbar(api, 'bookmark', 'notifications')}
    <div class="setup-portfolio-body">
      ${heading('Connect your portfolio', 'See which theses and signals matter to the assets you hold.')}
      <div class="setup-broker-list">
        ${BROKERS.map(broker => `<div class="setup-broker">
          ${image(api, broker.logo, 'setup-broker-logo', broker.name)}
          <div class="setup-broker-name">${broker.name}${broker.beta ? '<span class="setup-beta">Beta</span>' : ''}</div>
          <button class="setup-connect" type="button" data-connect="${broker.id}">Connect</button>
        </div>`).join('')}
      </div>
    </div>
    <footer class="setup-dock"><button class="setup-next" data-action="next" type="button" disabled>Next</button></footer>`;
  const update = () => {
    root.querySelectorAll('[data-connect]').forEach(button => {
      const connected = api.state.connections.has(button.dataset.connect);
      button.textContent = connected ? 'Connected' : 'Connect';
      button.classList.toggle('is-connected', connected);
      button.setAttribute('aria-pressed', String(connected));
    });
    root.querySelector('[data-action="next"]').disabled = api.state.connections.size === 0;
  };
  root.querySelectorAll('[data-connect]').forEach(button => button.addEventListener('click', () => {
    const broker = BROKERS.find(b => b.id === button.dataset.connect);
    if (api.state.connections.has(broker.id)) { api.toast(`${broker.name} is connected with read-only access.`); return; }
    api.sheet({title: `Connect ${broker.name}`, body: 'Connect an account with read-only access. This preview simulates the connection without collecting account details.', actions: [
      {label: 'Cancel', onClick() {}},
      {label: 'Connect', primary: true, onClick() {api.state.connections.add(broker.id);update();}},
    ]});
  }));
  navigation(root, api, 'bookmark', 'notifications');
  update();
  return root;
}

function selectedTheses(api) {
  // One canonical record per exact thesis ID. A shared author is not identity.
  const byId = new Map();
  for (const thesis of [...(api.data?.theses || []), ...(api.data?.feed || [])]) {
    if (thesis?.id && thesis.body && !byId.has(thesis.id)) byId.set(thesis.id, thesis);
  }
  return [...(api.state.bookmarked || [])].map(id => byId.get(id)).filter(Boolean);
}
function trackingCard(thesis, api) {
  return `<article class="setup-tracked-thesis" data-thesis-id="${escape(thesis.id)}" aria-label="Tracking ${escape(thesis.author)} thesis">
    <div class="setup-tracked-author">${image(api, thesis.avatar, 'setup-tracked-avatar', thesis.author)}<strong>${escape(thesis.author)}</strong></div>
    <p class="setup-tracked-body">${escape(thesis.body)}</p>
    <div class="setup-tracking-status">${brandImage(api, 'setup-tracking-logo')}<span>Tracking signals</span></div>
  </article>`;
}
function renderNotifications(api) {
  const root = document.createElement('section');
  root.className = 'setup-page setup-notifications';
  root.setAttribute('aria-label', 'Turn on notifications');
  const selected = selectedTheses(api);
  const hasSelection = selected.length > 0;
  api.state.notificationThesisIds = selected.map(thesis => thesis.id);
  api.persist?.();
  const description = hasSelection
    ? 'Alva is now tracking signals for the theses you bookmarked. Turn on notifications so you don’t miss new opportunities.'
    : 'Bookmark theses to start tracking signals.';
  const extra = Math.max(0, selected.length - 2);
  root.innerHTML = `${topbar(api, 'portfolio')}
    <div class="setup-notifications-body">
      <div class="setup-notification-context">
        ${image(api, ASSETS.notification, 'setup-notification-icon')}
        ${heading('Don’t miss the next signal.', description)}
        ${hasSelection ? `<div class="setup-tracked-theses" aria-label="Theses Alva is tracking">
          ${selected.slice(0, 2).map(thesis => trackingCard(thesis, api)).join('')}
          ${extra ? `<p class="setup-tracked-more">+${extra} more ${extra === 1 ? 'thesis' : 'theses'}</p>` : ''}
        </div>` : ''}
      </div>
    </div>
    <footer class="setup-notification-dock"><button class="setup-not-now" type="button">Not now</button><button class="setup-enable" type="button">${hasSelection ? 'Turn on notifications' : 'Bookmark theses'}</button></footer>`;
  navigation(root, api, 'portfolio');
  root.querySelector('.setup-not-now').addEventListener('click', () => {
    api.state.notifications = 'skipped';
    api.persist?.();
    api.go('feed');
  });
  root.querySelector('.setup-enable').addEventListener('click', () => {
    if (!hasSelection) { api.go('bookmark'); return; }
    if (api.state.notifications === 'allowed') { api.go('feed'); return; }
    api.sheet({title: '“Alva” Would Like to Send You Notifications', body: 'Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.', actions: [
      {label: 'Don’t Allow', onClick() {api.state.notifications = 'denied';api.persist?.();api.go('feed');}},
      {label: 'Allow', primary: true, onClick() {api.state.notifications = 'allowed';api.persist?.();api.go('feed');}},
    ]});
  });
  return root;
}

export function renderSetupPage(name, api) {
  const renderer = {login: renderLogin, people: renderPeople, portfolio: renderPortfolio, notifications: renderNotifications}[name];
  if (!renderer) throw new Error(`Unknown setup page: ${name}`);
  return renderer(api);
}

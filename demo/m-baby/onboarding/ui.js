export const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function node(tag, className = '', html = '') { const el = document.createElement(tag); el.className = className; el.innerHTML = html; return el; }
export function image(id, api, className='', alt='') { return `<img class="${className}" src="${api.asset(id)}" alt="${escapeHTML(alt)}" draggable="false">`; }
export function topbar(api, back, skip) { const el=node('div','topbar'); if(back){const b=node('button','back-button',image(api.data.icons['arrow-left-l1'],api));b.type='button';b.setAttribute('aria-label','Back');b.onclick=back;el.append(b);} if(skip){const b=node('button','skip-button','Skip');b.onclick=skip;el.append(b);} return el; }
export function heading(title, description) { return node('header','intro-heading',`<h1>${escapeHTML(title).replace(/\n/g,'<br>')}</h1><p>${escapeHTML(description)}</p>`); }

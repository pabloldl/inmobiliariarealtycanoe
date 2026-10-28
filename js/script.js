'use strict';
// Publicar solo inmuebles comprobados y con imágenes autorizadas. Ver README.md.
const properties = [];
const nav = document.getElementById('navigation');
const toggle = document.querySelector('.menu-toggle');
toggle.hidden = false;
document.body.classList.add('menu-ready');
function closeMenu(restore = false) {
  toggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  if (restore) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu(true); });
document.addEventListener('click', e => { if (!e.target.closest('.header')) closeMenu(); });
document.addEventListener('focusin', e => { if (!e.target.closest('.header')) closeMenu(); });
window.matchMedia('(max-width: 700px)').addEventListener('change', () => closeMenu());
const copy = document.querySelector('.copy-phone');
copy.hidden = false;
copy.addEventListener('click', async () => {
  let copied = false;
  try {
    if (navigator.clipboard) { await navigator.clipboard.writeText('600280386'); copied = true; }
    else {
      const field = document.createElement('textarea');
      field.value = '600280386'; field.style.position = 'fixed'; field.style.opacity = '0';
      document.body.append(field); field.select(); copied = document.execCommand('copy'); field.remove(); copy.focus();
    }
  } catch { copied = false; }
  document.getElementById('copy-status').textContent = copied ? 'Teléfono copiado.' : 'Puedes copiar este número: 600 280 386.';
});
// No se renderizan ejemplos. La lista permanece vacía hasta recibir anuncios verificados.
const list = document.getElementById('property-list');
const dialog = document.getElementById('property-detail');
const detail = document.getElementById('detail-content');
function element(tag, text, className) {
  const node = document.createElement(tag); if (text) node.textContent = text;
  if (className) node.className = className; return node;
}
function facts(p) {
  return [p.area != null && `${p.area} m²`, p.bedrooms != null && `${p.bedrooms} habitaciones`, p.bathrooms != null && `${p.bathrooms} baños`].filter(Boolean).join(' · ');
}
function image(src, title) { const img = element('img'); img.src = src; img.alt = title; img.loading = 'lazy'; return img; }
function openProperty(p) {
  detail.replaceChildren(element('h2', p.title));
  detail.firstChild.id = 'detail-title';
  detail.append(element('p', `${p.type} · ${p.operation} · ${p.locality}`));
  if (p.price != null) detail.append(element('h3', new Intl.NumberFormat('es-ES', {style:'currency',currency:'EUR',maximumFractionDigits:0}).format(p.price) + (p.operation === 'Alquiler' ? ' / mes' : '')));
  p.images.forEach(src => detail.append(image(src, p.title)));
  if (facts(p)) detail.append(element('p', facts(p)));
  if (p.description) detail.append(element('p', p.description));
  const contact = element('a', 'Consultar este inmueble: 600 280 386', 'button green');
  contact.href = 'tel:+34600280386'; detail.append(contact); dialog.showModal();
}
const published = properties.filter(p => p.verified === true && p.title && p.type && p.operation && p.locality && p.images?.length && p.images.every(src => /^img\/[\w/-]+\.(webp|jpg|jpeg|png)$/i.test(src)));
published.forEach(p => {
  const card = element('button', null, 'property-card'); card.type = 'button';
  card.append(image(p.images[0], p.title));
  const body = element('div', null, 'property-card-body');
  body.append(element('small', `${p.operation} · ${p.type} · ${p.locality}`), element('h3', p.title));
  if (p.price != null) body.append(element('p', new Intl.NumberFormat('es-ES', {style:'currency',currency:'EUR',maximumFractionDigits:0}).format(p.price) + (p.operation === 'Alquiler' ? ' / mes' : '')));
  if (facts(p)) body.append(element('p', facts(p)));
  body.append(element('p', 'Ver inmueble')); card.append(body); card.addEventListener('click', () => openProperty(p)); list.append(card);
});
document.getElementById('property-empty').hidden = published.length > 0;
dialog.querySelector('.detail-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });

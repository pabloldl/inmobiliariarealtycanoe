'use strict';
const toggle = document.querySelector('.index-toggle');
const navigation = document.querySelector('#navigation');
const mobile = matchMedia('(max-width: 850px)');
document.documentElement.classList.add('js-index');
toggle.hidden = false;
function closeMenu(returnFocus = false) {
  navigation.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.publication-rail')) closeMenu();
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.publication-rail')) closeMenu();
});
mobile.addEventListener('change', () => closeMenu());

const copyButton = document.querySelector('.copy-phone');
const status = document.querySelector('#copy-status');
copyButton.addEventListener('click', async () => {
  let copied = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText('600280386');
      copied = true;
    }
  } catch { /* Use the local fallback if clipboard permission is unavailable. */ }
  if (!copied) {
    const field = document.createElement('textarea');
    field.value = '600280386';
    field.setAttribute('readonly', '');
    field.setAttribute('aria-label', 'Teléfono para copiar');
    field.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0';
    document.body.append(field);
    field.select();
    try { copied = document.execCommand('copy'); } catch { copied = false; }
    field.remove();
    copyButton.focus({ preventScroll: true });
  }
  status.textContent = copied ? 'Teléfono copiado: 600 280 386' : 'Puedes copiar este número: 600280386';
});

// The index follows the currently read spread without changing browser history.
const indexLinks = [...navigation.querySelectorAll('a')];
let scheduled = false;
function updateIndex() {
  const sections = [...document.querySelectorAll('main > section')];
  const readingLine = innerHeight * 0.35;
  let active = '#inicio';
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= readingLine) active = section.id ? '#' + section.id : '#inicio';
  });
  indexLinks.forEach(link => {
    if (link.hash === active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateIndex); }
}, { passive: true });
updateIndex();

const motion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pending');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.photo-entry, .type-entry').forEach(element => {
    if (element.getBoundingClientRect().top > innerHeight) {
      element.classList.add('pending');
      observer.observe(element);
    }
  });
  motion.addEventListener('change', () => {
    if (motion.matches) {
      observer.disconnect();
      document.querySelectorAll('.pending').forEach(element => element.classList.remove('pending'));
    }
  });
}
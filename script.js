// ===== Настройки сайта — поменяйте здесь =====
const CONFIG = {
  // Номер WhatsApp в международном формате, только цифры (например 77011234567)
  whatsapp: '77008202002',
  phoneLabel: '+7 700 820 2002',
  instagram: 'https://www.instagram.com/graceimfitness/',
  // Актуальные «Отзывы» в профиле
  instagramReviews: 'https://www.instagram.com/stories/highlights/17916700521413272/',
  // Позиции LOVE-FIT. Добавьте ещё 3 — заголовок сам станет «19 позиций. 19 состояний»
  positions: [
    'Стоя', 'Slow', 'На носках', 'Наездница',
    'Низ', 'Четвереньки', 'На локтях', 'Base',
    'Leg Up', 'Belly', 'Столик', 'Паучок',
    'Горка', 'Triangle 45°', 'Прогиб', 'Треугольник',
  ],
};

// WhatsApp-ссылки с готовым текстом сообщения
document.querySelectorAll('[data-wa]').forEach((el) => {
  el.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(el.dataset.wa)}`;
  el.target = '_blank';
  el.rel = 'noopener';
});
document.getElementById('waText').textContent = CONFIG.phoneLabel;
const tel = document.getElementById('telLink');
tel.href = 'tel:+' + CONFIG.whatsapp;
tel.textContent = CONFIG.phoneLabel;
document.querySelectorAll('[data-ig]').forEach((a) => { a.href = CONFIG.instagram; });
document.querySelectorAll('[data-ig-reviews]').forEach((a) => { a.href = CONFIG.instagramReviews; });
document.getElementById('year').textContent = new Date().getFullYear();

// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
});

// Замочки с позициями
const lockSvg = '<svg class="lock__icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v4H5v13h14V10h-2V6a5 5 0 0 0-5-5Zm-3 5a3 3 0 0 1 6 0v4H9V6Zm3 8a2 2 0 0 1 1 3.7V20h-2v-2.3A2 2 0 0 1 12 14Z"/></svg>';
const locks = document.getElementById('locks');
const reveal = document.getElementById('lockReveal');
const pad = (n) => String(n).padStart(2, '0');

document.getElementById('posCount').textContent = CONFIG.positions.length;
document.getElementById('posCount2').textContent = CONFIG.positions.length;

CONFIG.positions.forEach((name, i) => {
  const btn = document.createElement('button');
  btn.className = 'lock';
  btn.type = 'button';
  btn.setAttribute('aria-label', `Открыть позицию ${i + 1}`);
  btn.innerHTML = `<span class="lock__n">${pad(i + 1)}</span>${lockSvg}<span class="lock__name">${name}</span>`;
  btn.addEventListener('click', () => {
    btn.classList.add('is-open');
    locks.querySelectorAll('.is-current').forEach((b) => b.classList.remove('is-current'));
    btn.classList.add('is-current');
    document.getElementById('lockRevealN').textContent = `Позиция ${pad(i + 1)} открыта`;
    document.getElementById('lockRevealName').textContent = name;
    reveal.hidden = false;
    reveal.style.animation = 'none';
    void reveal.offsetWidth;
    reveal.style.animation = '';
  });
  locks.appendChild(btn);
});

// Плашка 18+ (запоминаем ответ в браузере)
const age = document.getElementById('age');
let ageOk = false;
try { ageOk = localStorage.getItem('age18') === '1'; } catch (e) {}
if (!ageOk) age.hidden = false;
document.getElementById('ageOk').addEventListener('click', () => {
  age.hidden = true;
  try { localStorage.setItem('age18', '1'); } catch (e) {}
});

// Отзывы: карточки из reviews.js, фильтры, «показать ещё» и просмотр скриншота
const reviewsList = document.getElementById('reviewsList');
const reviewsMore = document.getElementById('reviewsMore');
const shot = document.getElementById('shot');
const shotImgs = document.getElementById('shotImgs');
const REVIEWS_STEP = 6;
let reviewsFilter = 'all';
let reviewsShown = REVIEWS_STEP;

const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text) node.textContent = text;
  return node;
};

function reviewCard(r) {
  const card = el('article', 'review');
  card.append(el('p', 'card__tag', r.tag));
  const text = el('p', 'review__text', r.text);
  card.append(text);
  if (r.note) card.append(el('p', 'review__note', r.note));
  const foot = el('div', 'review__foot');
  foot.append(el('span', 'review__who', r.name));
  const actions = el('div', 'review__actions');
  const more = el('button', 'review__link', 'Читать полностью');
  more.type = 'button';
  more.hidden = true;
  more.addEventListener('click', () => {
    const open = card.classList.toggle('is-open');
    more.textContent = open ? 'Свернуть' : 'Читать полностью';
  });
  const orig = el('button', 'review__link', 'Скриншот');
  orig.type = 'button';
  orig.addEventListener('click', () => openShot(r));
  actions.append(more, orig);
  foot.append(actions);
  card.append(foot);
  card._more = more;
  card._text = text;
  return card;
}

function renderReviews() {
  const items = REVIEWS.filter((r) => reviewsFilter === 'all' || r.type === reviewsFilter);
  reviewsList.replaceChildren(...items.slice(0, reviewsShown).map(reviewCard));
  reviewsMore.hidden = items.length <= reviewsShown;
  // «Читать полностью» только у текстов, которые не поместились
  reviewsList.querySelectorAll('.review').forEach((card) => {
    card._more.hidden = card._text.scrollHeight <= card._text.clientHeight + 2;
  });
}

function openShot(r) {
  shotImgs.replaceChildren(...r.shots.map((name, i) => {
    const img = el('img');
    img.src = `assets/reviews/rv-${name}.jpg`;
    img.alt = `Скриншот отзыва${r.shots.length > 1 ? `, часть ${i + 1}` : ''}`;
    img.loading = 'lazy';
    return img;
  }));
  shot.showModal();
  shot.scrollTop = 0;
}

document.getElementById('reviewFilters').addEventListener('click', (e) => {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  reviewsFilter = btn.dataset.filter;
  reviewsShown = REVIEWS_STEP;
  document.querySelectorAll('#reviewFilters [data-filter]').forEach((b) => {
    b.classList.toggle('is-active', b === btn);
    b.setAttribute('aria-selected', b === btn);
  });
  renderReviews();
});
reviewsMore.addEventListener('click', () => {
  reviewsShown += REVIEWS_STEP;
  renderReviews();
});
document.getElementById('shotClose').addEventListener('click', () => shot.close());
shot.addEventListener('click', (e) => { if (e.target === shot) shot.close(); });
renderReviews();

// Нижняя панель на телефоне — появляется после первого экрана
const bar = document.getElementById('stickyBar');
const onScroll = () => bar.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.7);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

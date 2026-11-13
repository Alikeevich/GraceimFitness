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

// Подбор направления на главной: «Что ты хочешь изменить в своей жизни?»
const CHOOSER = {
  body: {
    title: 'Камасутра LOVE-FIT',
    text: 'Групповые тренировки под музыку: подвижность таза, гибкость, пластика и выносливость. Интимная гимнастика уже внутри каждой тренировки.',
    price: 'от 40 000 ₸ за 8 занятий',
    href: 'lovefit.html',
    wa: 'Здравствуйте, Назина! Хочу прийти на тренировку Камасутра LOVE-FIT',
  },
  sensual: {
    title: '«Чувственная»',
    text: '8 встреч о женственности, желаниях, границах и искусстве близости. Телесные практики и психологическая работа в женском кругу.',
    price: 'от 120 000 ₸ за 8 встреч',
    href: 'chuvstvennaya.html',
    wa: 'Здравствуйте, Назина! Хочу узнать о программе «Чувственная»',
  },
  health: {
    title: 'Интимная гимнастика',
    text: 'Осознанная работа с мышцами тазового дна, дыханием и диафрагмой. При жалобах — сначала консультация гинеколога.',
    price: 'от 30 000 ₸ за занятие',
    href: 'intimate.html',
    wa: 'Здравствуйте, Назина! Хочу узнать об интимной гимнастике',
  },
  inner: {
    title: 'Психология',
    text: 'Консультации КПТ-психолога: измена, треугольники, зависимость от отношений, самооценка и внутренняя опора.',
    price: 'от 20 000 ₸ за час',
    href: 'psychology.html',
    wa: 'Здравствуйте, Назина! Хочу записаться на психологическую консультацию',
  },
  career: {
    title: 'Обучение тренеров',
    text: 'Авторская методика Kamasutra Fitness, женское здоровье, психология и запуск своей практики. 6 недель, онлайн или офлайн.',
    price: 'от 1 500 000 ₸',
    href: 'training.html',
    wa: 'Здравствуйте, Назина! Хочу узнать об обучении на тренера',
  },
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const el = (tag, cls, text) => {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text) node.textContent = text;
  return node;
};
const waHref = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

// WhatsApp-ссылки с готовым текстом сообщения
function bindWhatsApp(root = document) {
  $$('[data-wa]', root).forEach((a) => {
    a.href = waHref(a.dataset.wa);
    a.target = '_blank';
    a.rel = 'noopener';
  });
}
bindWhatsApp();
$$('[data-phone]').forEach((a) => { a.href = 'tel:+' + CONFIG.whatsapp; a.textContent = CONFIG.phoneLabel; });
$$('[data-wa-label]').forEach((a) => { a.textContent = CONFIG.phoneLabel; });
$$('[data-ig]').forEach((a) => { a.href = CONFIG.instagram; });
$$('[data-ig-reviews]').forEach((a) => { a.href = CONFIG.instagramReviews; });
$$('[data-year]').forEach((s) => { s.textContent = new Date().getFullYear(); });

// Мобильное меню
const burger = $('#burger');
const nav = $('#nav');
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

// Замочки с позициями (страница LOVE-FIT)
const locks = $('#locks');
if (locks) {
  const lockSvg = '<svg class="lock__icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v4H5v13h14V10h-2V6a5 5 0 0 0-5-5Zm-3 5a3 3 0 0 1 6 0v4H9V6Zm3 8a2 2 0 0 1 1 3.7V20h-2v-2.3A2 2 0 0 1 12 14Z"/></svg>';
  const reveal = $('#lockReveal');
  const pad = (n) => String(n).padStart(2, '0');
  $$('[data-pos-count]').forEach((s) => { s.textContent = CONFIG.positions.length; });
  CONFIG.positions.forEach((name, i) => {
    const btn = el('button', 'lock');
    btn.type = 'button';
    btn.setAttribute('aria-label', `Открыть позицию ${i + 1}`);
    btn.innerHTML = `<span class="lock__n">${pad(i + 1)}</span>${lockSvg}<span class="lock__name">${name}</span>`;
    btn.addEventListener('click', () => {
      btn.classList.add('is-open');
      $$('.is-current', locks).forEach((b) => b.classList.remove('is-current'));
      btn.classList.add('is-current');
      $('#lockRevealN').textContent = `Позиция ${pad(i + 1)} открыта`;
      $('#lockRevealName').textContent = name;
      reveal.hidden = false;
      reveal.style.animation = 'none';
      void reveal.offsetWidth;
      reveal.style.animation = '';
    });
    locks.appendChild(btn);
  });
}

// Подбор направления (главная)
const chooser = $('#chooser');
if (chooser) {
  const show = (key) => {
    const c = CHOOSER[key];
    $$('[data-choice]', chooser).forEach((b) => {
      const on = b.dataset.choice === key;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on);
    });
    $('#chooserTitle').textContent = c.title;
    $('#chooserText').textContent = c.text;
    $('#chooserPrice').textContent = c.price;
    $('#chooserMore').href = c.href;
    const wa = $('#chooserWa');
    wa.dataset.wa = c.wa;
    bindWhatsApp(chooser);
  };
  chooser.addEventListener('click', (e) => {
    const b = e.target.closest('[data-choice]');
    if (b) show(b.dataset.choice);
  });
  show('body');
}

// Плашка 18+ (запоминаем ответ в браузере)
const age = $('#age');
let ageOk = false;
try { ageOk = localStorage.getItem('age18') === '1'; } catch (e) {}
if (!ageOk) age.hidden = false;
$('#ageOk').addEventListener('click', () => {
  age.hidden = true;
  try { localStorage.setItem('age18', '1'); } catch (e) {}
});

// Отзывы: карточки из reviews.js в любом блоке [data-reviews]
// data-type — направление (train, psy, live), data-limit — сколько показать сразу,
// data-step — сколько добавлять по кнопке «Показать ещё» (только на странице отзывов)
const shot = $('#shot');
const shotImgs = $('#shotImgs');

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
$('#shotClose').addEventListener('click', () => shot.close());
shot.addEventListener('click', (e) => { if (e.target === shot) shot.close(); });

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

$$('[data-reviews]').forEach((list) => {
  const step = Number(list.dataset.step) || 0;
  let shown = Number(list.dataset.limit) || REVIEWS.length;
  let type = list.dataset.type || 'all';
  const moreBtn = list.parentElement.querySelector('[data-reviews-more]');
  const filters = list.parentElement.querySelector('[data-reviews-filters]');

  const render = () => {
    const items = REVIEWS.filter((r) => type === 'all' || r.type === type);
    list.replaceChildren(...items.slice(0, shown).map(reviewCard));
    if (moreBtn) moreBtn.hidden = items.length <= shown;
    // «Читать полностью» только у текстов, которые не поместились
    $$('.review', list).forEach((card) => {
      card._more.hidden = card._text.scrollHeight <= card._text.clientHeight + 2;
    });
  };

  if (moreBtn) moreBtn.addEventListener('click', () => { shown += step; render(); });
  if (filters) filters.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    type = btn.dataset.filter;
    shown = Number(list.dataset.limit) || REVIEWS.length;
    $$('[data-filter]', filters).forEach((b) => {
      b.classList.toggle('is-active', b === btn);
      b.setAttribute('aria-pressed', b === btn);
    });
    render();
  });
  render();
});

// Нижняя панель на телефоне — появляется после первого экрана
const bar = $('#stickyBar');
const onScroll = () => bar.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.7);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

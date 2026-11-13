# GRACEIM FITNESS

Сайт-каталог услуг Назины Каниевой: программы, прайс, отзывы, запись через WhatsApp.

Статичный сайт без сборки: `index.html`, `styles.css`, `script.js`, `reviews.js`, картинки в `assets/`.

## Деплой на Vercel

Framework Preset — **Other**, Build Command и Output Directory оставить пустыми. Vercel отдаёт файлы из корня как есть.

## Страницы

- `index.html` — главная: направления, подбор «Что ты хочешь изменить?», обо мне, 3 отзыва
- `lovefit.html`, `chuvstvennaya.html`, `intimate.html`, `psychology.html`, `training.html` — направления: сверху суть, цены и запись, ниже подробности
- `reviews.html` — все отзывы, `prices.html` — прайс и вопросы

Шапка, контакты и подвал одинаковые на всех страницах — меняйте их во всех файлах.

## Фото

Положите файлы в `assets/photos/` с такими именами — они сами встанут вместо заглушек:
`hero.jpg` (главный кадр), `about.jpg` (обо мне), `lovefit.jpg`, `chuvstvennaya.jpg`, `intimate.jpg`, `psychology.jpg`, `training.jpg`.
Лучше вертикальные кадры около 1200 px по длинной стороне.

Сейчас стоят **временные фото с Unsplash** (бесплатная лицензия, можно в коммерческих целях) — заменить на фото Назины:
`hero` — photo-1788204996840, `about` — photo-1706192048459, `lovefit` — photo-1597586594276,
`chuvstvennaya` — photo-1518893063132, `intimate` — photo-1518708909080, `psychology` — photo-1739980153522,
`training` — photo-1747239685045.

## Где что менять

- **WhatsApp, телефон, Instagram, позиции LOVE-FIT** — объект `CONFIG` в начале `script.js`.
- **Отзывы** — `reviews.js`, скриншоты в `assets/reviews/rv-<имя>.jpg`.
- **Цены и тексты** — в файле нужной страницы; цены также в `prices.html` и в карточках на `index.html`.

После правок CSS или JS поднимите версию во всех `.html` (`?v=9` → `?v=10`), чтобы у посетителей не остался старый кеш.

## Домен, иконки, документы

- Адрес сайта `https://graceimfitness.vercel.app` прописан в превью ссылок (`og:image`, `og:url`), `canonical`, `robots.txt` и `sitemap.xml`. При подключении своего домена замените его поиском по всем файлам.
- Иконки — `favicon.ico` и `assets/icons/`, превью ссылки для WhatsApp/Telegram — `assets/og-image.jpg`.
- Документы — `privacy.html` (политика конфиденциальности) и `terms.html` (условия использования). Реквизиты ИП и условия возврата пока не указаны.
- `404.html` Vercel показывает автоматически для несуществующих адресов.

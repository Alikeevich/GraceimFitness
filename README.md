# GRACEIM FITNESS

Сайт-каталог услуг Назины Каниевой: программы, прайс, отзывы, запись через WhatsApp.

Статичный сайт без сборки: `index.html`, `styles.css`, `script.js`, `reviews.js`, картинки в `assets/`.

## Деплой на Vercel

Framework Preset — **Other**, Build Command и Output Directory оставить пустыми. Vercel отдаёт файлы из корня как есть.

## Где что менять

- **WhatsApp, телефон, Instagram, позиции LOVE-FIT** — объект `CONFIG` в начале `script.js`.
- **Отзывы** — `reviews.js`, скриншоты в `assets/reviews/rv-<имя>.jpg`.
- **Цены и тексты** — `index.html`.

После правок CSS или JS поднимите версию в `index.html` (`?v=5` → `?v=6`), чтобы у посетителей не остался старый кеш.

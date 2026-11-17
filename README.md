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

## Фото и видео

Фото Назины лежат в `assets/photos/` (до 1400 px по длинной стороне). Чтобы заменить — положите файл с тем же именем:
`hero.jpg` (главный кадр), `about.jpg` (обо мне), `lovefit.jpg`, `chuvstvennaya.jpg`, `intimate.jpg`, `psychology.jpg`, `training.jpg`,
`gallery-1…4.jpg` (галерея «Атмосфера» на странице «Чувственная»).

Видео в `assets/video/` — без звука, по кругу, H.264 720×1280:
`lovefit.mp4` (верх страницы LOVE-FIT) и `chuvstvennaya.mp4` (галерея «Чувственной»), к каждому `-poster.jpg` — первый кадр.
Исходники клиентки — в `_private/media/` (в git не попадают).

## Где что менять

- **WhatsApp, телефон, Instagram, позиции LOVE-FIT** — объект `CONFIG` в начале `script.js`.
- **Отзывы** — `reviews.js`, скриншоты в `assets/reviews/rv-<имя>.jpg`.
- **Цены и тексты** — в файле нужной страницы; цены также в `prices.html` и в карточках на `index.html`.

После правок CSS или JS поднимите версию во всех `.html` (`?v=11` → `?v=12`), чтобы у посетителей не остался старый кеш.

## Домен, иконки, документы

- Адрес сайта `https://graceimfitness.vercel.app` прописан в превью ссылок (`og:image`, `og:url`), `canonical`, `robots.txt` и `sitemap.xml`. При подключении своего домена замените его поиском по всем файлам.
- Иконки — `favicon.ico` и `assets/icons/`, превью ссылки для WhatsApp/Telegram — `assets/og-image.jpg`.
- Документы — `privacy.html` (политика конфиденциальности) и `terms.html` (условия использования). Реквизиты ИП и условия возврата пока не указаны.
- `404.html` Vercel показывает автоматически для несуществующих адресов.

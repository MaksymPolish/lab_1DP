# Лабораторна робота №1 - Інструкції по завершенню

## Виконано автоматично ✓

### Встановлено та налаштовано:
1. ✅ Git репозиторій ініціалізовано
2. ✅ React + Vite + TypeScript проєкт створено
3. ✅ ESLint налаштовано з підтримкою TypeScript та React
4. ✅ Npm скрипти визначено:
   - `npm run dev` - запуск dev сервера
   - `npm run build` - збудувати для продакшену
   - `npm run lint` - перевірка коду
   - `npm run preview` - переглянути production збірку
5. ✅ VS Code налаштування (.vscode/settings.json)
6. ✅ GitHub Actions workflow готовий до розгортання
7. ✅ Код успішно проходить лінтинг

## Залишилось виконати вручну 📝

### Крок 1: Створити репозиторій на GitHub

1. Перейдіть на [GitHub.com](https://github.com)
2. Натисніть **"+"** → **"New repository"**
3. Заповніть дані:
   - **Repository name**: `lab-1-setup`
   - **Description**: "Lab 1 - Web Development Environment Setup and Deployment"
   - **Public** ← вибрати
   - Інші параметри залишити за замовчуванням

### Крок 2: Пов'язати локальний репозиторій з GitHub

Виконайте в терміналі (в директорії my-app):

```bash
git remote add origin https://github.com/YOUR_USERNAME/lab-1-setup.git
git branch -M main
git push -u origin main
```

Замість `YOUR_USERNAME` введіть ваше ім'я користувача GitHub.

**Результат**: Весь код буде завантажено на GitHub.

### Крок 3: Налаштувати GitHub Pages

1. Перейдіть у **Settings** вашого репозиторію на GitHub
2. У лівому меню знайдіть **Pages**
3. Виберіть:
   - **Source**: "GitHub Actions"
   - Система автоматично переглянути файл `.github/workflows/deploy.yml`
4. Натисніть **Save**

**Результат**: 
- GitHub Pages буде развернута під адресою:
- `https://YOUR_USERNAME.github.io/lab-1-setup`
- При кожному push в main гілку буде автоматично перебудова

### Крок 4: Розгорнути на Vercel

1. Перейдіть на [Vercel.com](https://vercel.com)
2. Натисніть **"Sign Up"** і виберіть **"Continue with GitHub"**
3. Авторизуйтесь
4. На головній сторінці натисніть **"Add New"** → **"Project"**
5. Виберіть репозиторій `lab-1-setup` зі списку
6. Vercel автоматично розпізнає конфігурацію:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
7. Натисніть **"Deploy"**

**Результат**: Проект буде розгорнено на Vercel із посиланням вигляду:
`https://your-project-name.vercel.app`

### Крок 5: Зберіть улюче дані для звіту

1. **GitHub URL**: `https://github.com/YOUR_USERNAME/lab-1-setup`

2. **GitHub Pages URL**: `https://YOUR_USERNAME.github.io/lab-1-setup`

3. **Vercel URL**: прямої посилання з панелі Vercel

4. **Screenshot лінтинг результатів**: Виконайте в терміналі:
   ```bash
   npm run lint
   ```
   Зробіть скріншот виводу (повинна бути порожня - без помилок)

## Структура проєкту

```
my-app/
├── src/
│   ├── App.tsx           # Головний React компонент
│   ├── App.css           # Стилі компоненту
│   ├── main.tsx          # Entry point
│   ├── index.css         # Глобальні стилі
│   └── assets/           # Статичні файли
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions для розгортання
├── .vscode/
│   └── settings.json     # VS Code налаштування
├── eslint.config.js      # ESLint конфіг
├── vite.config.ts        # Vite конфіг
├── tsconfig.json         # TypeScript конфіг
└── package.json          # Залежності та скрипти
```

## Команди для тестування

Перед завантаженням на GitHub перевірте:

```bash
# 1. Перевірити лінтинг
npm run lint

# 2. Перевірити збірку
npm run build

# 3. Запустити dev сервер (для тестування)
npm run dev
# Відкрийте http://localhost:5173 у браузері
```

## Конечна контрольна перевірка

Переконайтесь, що виконано:

- ✅ GitHub репозиторій створено (назва: lab-1-setup)
- ✅ Код завантажено на GitHub (main гілка)
- ✅ GitHub Pages налаштовано та працює
- ✅ Vercel розгортання завершено
- ✅ npm run lint проходить без помилок
- ✅ Зібрані всі посилання для звіту

## Файли для звіту

Звіт повинен містити:

1. **Назва**: "[Розгортання Веб] Лабораторна робота №1: Налаштування середовища розробки та базові інструменти розгортання"

2. **Посилання на GitHub**: `https://github.com/YOUR_USERNAME/lab-1-setup`

3. **Посилання на GitHub Pages**: `https://YOUR_USERNAME.github.io/lab-1-setup`

4. **Посилання на Vercel**: `https://your-project-name.vercel.app`

5. **Скріншот**: Результат виконання `npm run lint` (повинна бути порожня без помилок)

6. **Висновок**: Коротко описати:
   - Які інструменти були настроєні
   - Які складності були зустрінуті
   - Переваги використання GitHub Pages та Vercel
   - Вірні послідовність дій для настройки середовища розробки

## Допоміжні ресурси

- 📖 [Vite Documentation](https://vitejs.dev)
- ⚛️ [React Documentation](https://react.dev)
- 🔍 [ESLint Rules](https://eslint.org/docs/rules/)
- 🚀 [GitHub Pages Guide](https://docs.github.com/en/pages)
- 🌐 [Vercel Documentation](https://vercel.com/docs)

---

**Статус**: Локальне налаштування завершено. Готово до завантаження на GitHub та розгортання.

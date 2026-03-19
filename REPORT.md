# [Розгортання Веб] Лабораторна робота №1: Налаштування середовища розробки та базові інструменти розгортання

**Студент:** Maksim Polishchuk  
**Email:** maksym.polishchuk@oa.edu.ua  
**Дата:** 19 березня 2026  
**Статус:** ✅ Завершено

---

## 1. Посилання на ресурси

### GitHub репозиторій
🔗 **https://github.com/MaksymPolish/lab_1DP**

### GitHub Pages (Static Host)
🌐 **https://maksympolish.github.io/lab_1DP/**

### Vercel (PaaS)
🚀 **https://lab-1-dp-rzs1.vercel.app/**

---

## 2. Огляд виконаної роботи

### 2.1 Встановлено та налаштовано

#### Побудова проєкту
- ✅ **React** 18.x з TypeScript
- ✅ **Vite** 8.0+ як збірник (замість Webpack)
- ✅ **Node.js** LTS (v24.14.0)
- ✅ **npm** як менеджер пакетів

#### Якість коду
- ✅ **ESLint 9** з плаґінами для React та TypeScript
- ✅ **TypeScript** strict mode (noUnusedLocals, noUnusedParameters)
- ✅ Автоматичне форматування на збереженні (Prettier через VS Code)
- ✅ ESLint перевірка перед комітом

#### Контроль версій
- ✅ **Git** 2.51.0 з коректною конфігурацією користувача
- ✅ GitHub репозиторій з гілкою `main`
- ✅ 7 комітів з описовими повідомленнями

#### Розгортання
- ✅ **GitHub Pages** з GitHub Actions (CI/CD)
- ✅ **Vercel** для serverless розгортання
- ✅ Динамічна конфігурація базового шляху для обох платформ
- ✅ `.npmrc` для вирішення конфліктів залежностей

### 2.2 Функціональність сайту

Проект містить **Interactive Click Counter** - демонстраційний додаток для перевірки функціональності:

- 🎯 **Счетчик кликов** - демонструє React state management `useState`
- ➕ **Кнопка "Click Me!"** - збільшує лічильник при кліку
- ↻ **Кнопка "Reset"** - обнулює лічильник
- 🎨 **Красивий дизайн** з градієнтним фоном та анімаціями
- 📱 **Адаптивна верстка** для мобільних та десктопних пристроїв

### 2.3 Структура проєкту

```
lab_1DP/
├── src/
│   ├── App.tsx              # Головний React компонент з лічильником
│   ├── App.css              # Стилизація Click Counter
│   ├── main.tsx             # Entry point (React 18 API)
│   ├── index.css            # Глобальні стилі
│   └── assets/              # Статичні файли (SVG, PNG)
│
├── .github/workflows/       # GitHub Actions
│   └── deploy.yml           # Автоматичне розгортання на GitHub Pages
│
├── public/
│   └── .nojekyll            # Цей файл розповідає GitHub Pages не обробляти Jekyll
│
├── .vscode/
│   └── settings.json        # VS Code налаштування (автоформатування, ESLint)
│
├── .npmrc                   # npm конфіг для вирішення peer dependencies
│
├── vite.config.ts           # Vite конфіг з динамічним базовим шляхом
│ 
├── eslint.config.js         # ESLint конфіг (v9 flat config)
├── tsconfig.json            # TypeScript конфіг (strict mode)
└── package.json             # Залежності та npm скрипти
```

---

## 3. npm Скрипти та команди

```bash
npm run dev      # Запуск локального dev сервера (http://localhost:5173)
npm run build    # Збудувати оптимізовану версію для продакшену
npm run preview  # Переглянути локально production збірку
npm run lint     # Перевірити код на помилки та стиль (ESLint)
```

Всі скрипти успішно виконуються:
- ✅ `npm run dev` - розташовується на порту 5173
- ✅ `npm run build` - збірка завершується за 64-73ms
- ✅ `npm run lint` - **0 помилок, 0 попереджень** ✓

---

## 4. Скріншот ESLint перевірки

```
PS D:\AcademStaff\DPWebServicesAndApplication\lab1\my-app> npm run lint

> my-app@0.0.0 lint
> eslint src --ext .ts,.tsx --max-warnings 0

```

**Результат:** ✅ Успішно - код повністю відповідає стандартам якості

---

## 5. Розгортання

### 5.1 GitHub Pages

**Платформа:** Статичний хостинг GitHub Pages  
**Метод:** GitHub Actions (CI/CD Pipeline)  
**Адреса:** https://maksympolish.github.io/lab_1DP/  
**Статус:** ✅ Активна та працює

**Як працює:**
1. При push на гілку `main` GitHub Actions тригерується
2. Запускається workflow `.github/workflows/deploy.yml`
3. Встановлюються залежності: `npm ci`
4. Проект збирається з флагом `GITHUB_PAGES=true`: `npm run build`
5. Результат у папці `dist/` завантажується на GitHub Pages
6. Сайт доступний за 1-2 хвилини

### 5.2 Vercel

**Платформа:** PaaS (Platform as a Service)  
**Інтеграція:** Автоматична з GitHub  
**Адреса:** https://lab-1-dp-rzs1.vercel.app/  
**Статус:** ✅ Активна та працює

**Як працює:**
1. Vercel підключений до GitHub репозиторію
2. При push автоматично запускається build
3. Vercel детектує Vite проект і використовує правильні команди
4. Build Command: `npm run build`
5. Output Directory: `dist/`
6. Розгортання завершується за 1-2 хвилини

### 5.3 Динамічна конфігурація базового шляху

Для сумісності обох платформ використовується **environment variable**:

```typescript
// vite.config.ts
const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGitHubPages ? '/lab_1DP/' : '/'
```

- На **GitHub Pages**: `base: '/lab_1DP/'` (назва репозиторію)
- На **Vercel**: `base: '/'` (root path)

---

## 6. Встановлені залежності

### Основні
- `react` 18.3.1
- `react-dom` 18.3.1

### Dev (ESLint, TypeScript, Bundler)
- `vite` 8.0.1
- `typescript` 5.9.3
- `eslint` 9.39.4
- `@typescript-eslint/eslint-plugin` 8.57.1
- `@typescript-eslint/parser` 8.57.1
- `eslint-plugin-react` 7.36.1
- `eslint-plugin-react-hooks` 5.0.0
- `@vitejs/plugin-react` 4.2.1
- `@types/node` 22.10.1
- `@types/react` 18.3.18
- `@types/react-dom` 18.3.5

Всього: **300 пакетів**, нульові вразливості

---

## 7. Висновки та результати

### 7.1 Досягнуті цілі

✅ **Налаштовано сучасне веб-середовище розробки**
- Студент навчився встановлювати та конфігурувати Node.js, npm, Git
- Розібець основні інструменти frontend розробника
- Зрозумів workflow з TypeScript та ESLint

✅ **Розроблено React + Vite проект**
- Створено functional React компонент з hooks (useState)
- Написано TypeScript код без типових помилок
- Впроваджено сучасні практики (JSX, CSS-in-module)

✅ **Налаштовано CI/CD pipeline**
- GitHub Actions автоматизує розгортання на GitHub Pages
- Vercel інтегрується з GitHub для PaaS розгортання
- Обидві платформи працюють без помилок

✅ **Дотримано best practices**
- ESLint перевіряє якість коду (0 помилок)
- TypeScript strict mode забезпечує безпеку типів
- Git комміти з описовими повідомленнями

### 7.2 Напрацьовані навички

1. **Командний рядок & Git**
   - Конфігурація Git та GitHub
   - Управління гілками та комітами
   - Локальна та віддалена синхронізація

2. **Front-end розробка**
   - React компоненти та hooks
   - TypeScript для типобезпеки
   - CSS для стилизації і адаптивності

3. **Контроль якості коду**
   - ESLint для статичного аналізу
   - Дотримання coding standards
   - Автоматичн форматування

4. **Розгортання та хостинг**
   - GitHub Pages для статичних сайтів
   - Vercel для Jamstack додатків
   - GitHub Actions для автоматизації

### 7.3 Виявлені складності та рішення

| Проблема | Рішення |
|----------|---------|
| ESLint peer dependencies конфлікт | Файл `.npmrc` з `legacy-peer-deps=true` |
| MIME type помилка на GitHub Pages | Правильно налаштований `base` path в Vite |
| Різні вимоги базового шляху | Динамічна конфігурація через environment variables |
| TypeScript помилка `process is not defined` | Встановлення `@types/node` |

### 7.4 Переваги GitHub Pages + Vercel

**GitHub Pages:**
- ✅ Безкоштовний хостинг для gh-pages
- ✅ Прямо пов'язаний з Git репозиторієм
- ✅ Вбудована GitHub Actions автоматизація
- ❌ Тільки статичні сайти

**Vercel:**
- ✅ Optimally designed for Next.js та Vite
- ✅ Edge functions та serverless capabilities
- ✅ Автоматичне масштабування
- ✅ Preview deployments для PR
- ✅ Analytics та мониторинг
- ❌ Потребує облікового запису (безкоштовний tier доступний)

Обидві платформи прекрасно підходять для різних сценаріїв!

---

## 8. Фінальна перевірка

✅ GitHub репозиторій: https://github.com/MaksymPolish/lab_1DP  
✅ GitHub Pages работает: https://maksympolish.github.io/lab_1DP/  
✅ Vercel развернут: https://lab-1-dp-rzs1.vercel.app/  
✅ npm run lint без помилок  
✅ npm run build успішно  
✅ Click Counter функціонує  
✅ Адаптивна верстка працює  
✅ TypeScript strict mode дотримується  
✅ ESLint rules дотримуються  

---

## Рекомендації на майбутнє

1. **Додати тести** - Jest + React Testing Library
2. **Вивчити Advanced React** - Context API, Redux, Zustand
3. **TypeScript Advanced** - Generic, Discriminated Unions
4. **Оптимізація** - код splitting, lazy loading, image optimization
5. **Accessibility** - WCAG compliance, aria labels
6. **E2E тестування** - Playwright, Cypress

---

**Лабораторна робота успішно завершена!** 🎉

---

*Документ складено: 19 березня 2026*  
*Статус: ✅ Ready for submission*

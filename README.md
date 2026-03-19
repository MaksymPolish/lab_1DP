# Lab 1 - Web Development Environment Setup

## Project Overview
This is a modern web development project setup using React, TypeScript, and Vite with automated linting and deployment pipelines.

## Setup Complete ✓

The following components have been configured:

### 1. Development Environment
- ✅ Node.js and npm installed
- ✅ Git initialized and configured
- ✅ VS Code settings configured (.vscode/settings.json)
  - Auto-format on save with Prettier
  - ESLint integration with auto-fix

### 2. Project Structure
- ✅ React + TypeScript + Vite application
- ✅ ESLint configured with TypeScript support
- ✅ npm scripts configured:
  - `npm run dev` - Start development server
  - `npm run build` - Build for production
  - `npm run lint` - Check code quality
  - `npm run preview` - Preview production build

### 3. Code Quality
- ✅ ESLint configured with recommended ruleset
- ✅ TypeScript strict mode enabled
- ✅ React and React Hooks linting rules active

## Next Steps - Manual Configuration

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new public repository
   - Repository name: `lab-1-setup`
   - Description: "Lab 1 - Web Development Environment Setup and Deployment"
   - Public repository
   - Add a .gitignore for Node.js (optional - we already have one)

2. Push your local code to GitHub:

```bash
cd my-app
git remote add origin https://github.com/YOUR_USERNAME/lab-1-setup.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up GitHub Pages

After pushing to GitHub:

1. Go to your repository Settings
2. Navigate to "Pages" section (left sidebar)
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - The workflow file is already configured in `.github/workflows/deploy.yml`
4. Now every push to `main` branch will automatically build and deploy

Your GitHub Pages URL will be: `https://YOUR_USERNAME.github.io/lab-1-setup`

### Step 3: Set Up Vercel Deployment

1. Go to [Vercel](https://vercel.com)
2. Sign up/Log in with your GitHub account
3. Click "Add New..." > "Project"
4. Select and import `lab-1-setup` repository
5. Vercel will automatically detect it's a Vite+React project:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click "Deploy"
7. Your Vercel URL will be provided after deployment

## Available Scripts

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Check code quality
npm run lint

# Preview production build
npm run preview
```

## Project Structure

```
my-app/
├── src/
│   ├── App.tsx          # Main React component
│   ├── App.css          # Component styles
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles
│   └── assets/          # Static assets
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions workflow
├── .vscode/
│   └── settings.json    # VS Code settings
├── eslint.config.js     # ESLint configuration (v9)
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Environment Variables

For Vercel deployment with environment variables:

1. Create `.env` file locally (not committed to git)
2. In Vercel dashboard: Settings > Environment Variables
3. Add your variables there

## Troubleshooting

### ESLint issues
- Run `npm run lint` to check code quality
- Most issues can be auto-fixed with proper VS Code extensions

### Build failures
- Ensure all TypeScript files are in `src/` directory
- Check that all imports are correct
- Verify `tsconfig.json` is properly configured

### Deployment issues
- GitHub Pages: Check "Actions" tab for workflow status
- Vercel: Check deployment logs in Vercel dashboard

## Recommended VS Code Extensions

Install these for better development experience:
- ESLint
- Prettier
- Tailwind CSS IntelliSense (if using Tailwind)
- Thunder Client or REST Client (for API testing)

## Assignment Checklist

- [ ] Created GitHub repository (lab-1-setup)
- [ ] Pushed all code to GitHub main branch
- [ ] GitHub Pages deployed and working
- [ ] Vercel deployment working
- [ ] npm run lint passes without errors
- [ ] Screenshot of lint output saved
- [ ] Lab report written with:
  - GitHub repository URL
  - GitHub Pages URL
  - Vercel deployment URL
  - npm run lint screenshot
  - Conclusion about the setup process

## Resources

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [ESLint Documentation](https://eslint.org)
- [GitHub Pages Help](https://docs.github.com/en/pages)
- [Vercel Documentation](https://vercel.com/docs)

---

**Status**: Environment setup and configuration complete. Ready for deployment.

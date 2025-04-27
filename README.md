# Kuro

A modern web application built with React and Hono, featuring a beautiful UI powered by shadcn/ui components.

## Deployment URLs

- **Frontend**: [kuro-gamma.vercel.app](https://kuro-gamma.vercel.app)
- **Backend**: [kuro-khro.vercel.app](https://kuro-khro.vercel.app)

## Project Structure

```
kuro/
├── kuro-frontend/     # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── dist/         # Build output
└── kuro-backend/     # Hono backend application
    └── api/          # API routes
```

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Development Tools**:
  - TypeScript
  - ESLint
  - SWC (for fast builds)

### Backend
- **Framework**: Hono
- **Deployment**: Vercel
- **Runtime**: Edge Runtime

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- Bun package manager

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd kuro-frontend
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

The application will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd kuro-backend
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run start
```

## Available Scripts

### Frontend
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run build:dev` - Build for development
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

### Backend
- `bun run start` - Start development server with Vercel
- `bun run deploy` - Deploy to Vercel

## Features

- Modern and responsive UI with shadcn/ui components
- Type-safe development with TypeScript
- Fast development experience with Vite and SWC
- Edge-ready backend with Hono
- Comprehensive UI component library including:
  - Modals and dialogs
  - Form elements
  - Navigation components
  - Data display components
  - And more!

## Development

The project uses modern development practices:
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling
- React Query for data fetching and caching
- React Hook Form for form handling
- Zod for schema validation

## Deployment

The application is configured for deployment on Vercel:
- Frontend: Built with Vite and deployed as a static site
- Backend: Deployed as Vercel Edge Functions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
# Kuro

A modern web application built with React and Hono, featuring a beautiful UI powered by shadcn/ui components and real-time communication capabilities.

## Deployment URLs

- **Frontend**: [kuro-gamma.vercel.app](https://kuro-gamma.vercel.app)
- **Backend**: [kuro-khro.vercel.app](https://kuro-khro.vercel.app)
- **Socket Server**: [wss://kuro-1.onrender.com](wss://kuro-1.onrender.com)
- **Marketing**: [Coming Soon]

## Project Structure

```
kuro/
├── kuro-frontend/     # React frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── dist/         # Build output
├── kuro-backend/     # Hono backend application
│   └── api/          # API routes
├── kuro-sockets/     # WebSocket server
│   ├── src/          # Source code
│   └── dist/         # Build output
└── kuro-marketing/   # Next.js marketing site
    └── src/          # Source code
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

### WebSocket Server
- **Framework**: Native WebSocket (ws)
- **Runtime**: Node.js
- **Language**: TypeScript
- **Features**:
  - Real-time bidirectional communication
  - Connection management
  - Event handling system
  - Integration with AI agent

### Marketing Site
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Content**: MDX
- **Deployment**: Vercel

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

### WebSocket Server Setup

1. Navigate to the WebSocket server directory:
```bash
cd kuro-sockets
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

The WebSocket server will be available at `ws://localhost:8080`

### Marketing Site Setup

1. Navigate to the marketing site directory:
```bash
cd kuro-marketing
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

The marketing site will be available at `http://localhost:3000`

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

### WebSocket Server
- `bun run dev` - Start development server
- `bun run build` - Build TypeScript code
- `bun run start` - Start production server
- `bun run watch` - Watch for changes

### Marketing Site
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Features

- Modern and responsive UI with shadcn/ui components
- Real-time communication with WebSocket server
- Type-safe development with TypeScript
- Fast development experience with Vite and SWC
- Edge-ready backend with Hono
- Beautiful marketing site with Next.js
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
- WebSocket for real-time features
- MDX for documentation

## Deployment

The application is configured for deployment on multiple platforms:
- Frontend: Built with Vite and deployed on Vercel
- Backend: Deployed as Vercel Edge Functions
- WebSocket Server: Deployed on Render
- Marketing Site: Deployed on Vercel

## Contributing

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for detailed information about:
- Project structure
- Development setup
- Contribution workflow
- Code style guidelines
- Pull request process

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
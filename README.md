# AI Course Generator

A modern web application for generating and managing AI educational courses, built with Next.js, TypeScript, and Tailwind CSS.

## Overview

AI Course Generator is a powerful platform that leverages AI to help create, manage, and deliver educational content. The application features authentication, course creation workflows, content management, and more.

## Features

- **AI-Powered Course Generation**: Create comprehensive courses tailored to specific topics
- **Authentication System**: Secure user accounts and role-based access
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Content Management**: Organize and structure educational materials
- **File Uploads**: Support for various document formats (PDF, DOCX, etc.)
- **API Integration**: Connect with various AI services for content generation

## Tech Stack

- **Frontend**: React 19, Next.js 15, Tailwind CSS 4
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: Compatible with various databases through Prisma
- **Authentication**: NextAuth v5
- **AI Integration**: LangChain, AI SDK
- **Storage**: AWS S3 for file storage
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A database (PostgreSQL recommended)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ai-course-generator.git
cd ai-course-generator
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Set up your environment variables:

Create a `.env` file in the root directory with the following variables:
```
AUTH_SECRET=""

DATABASE_URL=""
DIRECT_URL=""

REDIS_URL=""

AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

RESEND_API_KEY=""
GROQ_API_KEY=""
GOOGLE_GENERATIVE_AI_API_KEY=""

R2_ACCOUNT_ID=""
R2_ACCESS_KEY_ID=""
R2_SECRET_ACCESS_KEY=""
R2_BUCKET_NAME=""
R2_PUBLIC_URL=""
```

4. Initialize the database:

```bash
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable UI components
- `actions/` - Server actions for data mutations
- `lib/` - Utility functions and shared logic
- `modules/` - Feature-specific module code
- `prisma/` - Database schema and migrations
- `public/` - Static assets
- `styles/` - Global styles
- `types/` - TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with Next.js and Tailwind CSS
- Leverages various AI technologies for content generation

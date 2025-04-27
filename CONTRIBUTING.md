# Contributing to Kuro

Welcome to Kuro! We're excited that you're interested in contributing. This guide will help you understand our project structure and how you can contribute to different verticals.

## Getting Started with Bun

Before contributing, you'll need to set up Bun:

### Installing Bun
```bash
# For macOS, Linux, and WSL
curl -fsSL https://bun.sh/install | bash

# Verify installation
bun --version
```

### Setting up your fork
```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/yourUsername/kuro.git
cd kuro

# Add upstream remote
git remote add upstream https://github.com/yourUsername/kuro.git

# Install dependencies for each vertical
cd kuro-frontend && bun install
cd ../kuro-backend && bun install
cd ../kuro-marketing && bun install
```

## Project Structure

Kuro is divided into three main verticals, each serving a specific purpose:

1. Frontend (kuro-frontend)
2. Backend (kuro-backend)
3. Marketing Site (kuro-marketing)

## Verticals by Difficulty (Easiest to Hardest) and Current Status

### 1. Marketing Site (Beginner Friendly)
- **Tech Stack**: Next.js, TypeScript, Tailwind CSS
- **Purpose**: Public-facing marketing website
- **Current Status**: 
  - ✅ All features implemented (blogs, documentation, landing pages)
  - 🔄 Needs real content to replace placeholders
  - Priority: Content creation and refinement
- **Key Features**:
  - Static content management
  - MDX support for documentation
  - Responsive design
- **Contribution Needs**:
  - Write blog posts
  - Create documentation
  - Improve landing page copy
  - Add real-world use cases and examples
- **Getting Started**:
  ```bash
  cd kuro-marketing
  bun install
  bun run dev
  ```

### 2. Frontend (Intermediate)
- **Tech Stack**: React, TypeScript, Vite, Shadcn/UI
- **Purpose**: Main application interface
- **Current Status**:
  - ✅ UI components implemented
  - ✅ State management in place
  - 🔄 Using dummy API calls
  - ❌ Backend integration pending
- **Key Features**:
  - Complex UI components
  - State management
  - Real-time features
  - Form handling
  - Data visualization
- **Contribution Needs**:
  - Replace dummy API calls with real backend integration
  - Implement WebSocket connections for real-time features
  - Add error handling for API calls
  - Implement retry mechanisms
  - Add loading states
  - Improve error UX
- **Getting Started**:
  ```bash
  cd kuro-frontend
  bun install
  bun run dev
  ```

### 3. Backend (Advanced)
- **Tech Stack**: Hono.js, TypeScript, Vercel
- **Purpose**: API server and business logic
- **Current Status**:
  - 🚧 Core infrastructure set up
  - ❌ AI agent implementation pending
  - ❌ WebSocket endpoints needed
  - ❌ API endpoints to be implemented
- **Key Features**:
  - REST API endpoints
  - Serverless architecture
  - Edge computing capabilities
  - AI agent integration
- **Contribution Needs**:
  - Implement AI agent with:
    - Natural language processing
    - Context management
    - Response generation
    - Error handling
  - Set up WebSocket connections for:
    - Real-time agent communication
    - Stream processing
    - Connection management
  - Create RESTful API endpoints for:
    - User management
    - Session handling
    - Data persistence
    - Agent configuration
  - Implement security features:
    - Authentication
    - Authorization
    - Rate limiting
    - Input validation
- **Getting Started**:
  ```bash
  cd kuro-backend
  bun install
  bun run start
  ```

## Development Prerequisites

- Node.js (LTS version)
- Bun (Latest version)
- Git
- A code editor (VS Code recommended)

## How to Contribute

1. Fork the repository (see "Setting up your fork" above)
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Test your changes:
   ```bash
   bun test # in the relevant vertical directory
   ```
5. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: describe your changes"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Submit a pull request

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages (follow [Conventional Commits](https://www.conventionalcommits.org/))
- Document new features or changes
- Add comments for complex logic

## Testing

Each vertical has its own testing requirements:
- Frontend: Component and integration tests
- Backend: API, unit tests, and AI agent tests
- Marketing: Page rendering and accessibility tests

## Getting Help

If you need help:
- Check existing issues
- Create a new issue with a detailed description
- Join our community discussions

## Difficulty Levels Explained

### Why Marketing is Easiest
- More straightforward content management
- Less complex state management
- Mainly static content
- Good documentation and examples
- **Current Focus**: Content creation rather than technical implementation

### Why Frontend is Intermediate
- Complex state management
- Rich UI interactions
- Real-time features
- Performance optimization
- Extensive component library
- Form validation and handling
- Data visualization
- Cross-browser compatibility
- **Current Focus**: Backend integration and real-time features

### Why Backend is Most Complex
- Requires deep understanding of AI systems and agents
- Complex WebSocket implementation for real-time communication
- Sophisticated error handling and edge cases
- Performance optimization for AI operations
- Stream processing and management
- Scalability considerations
- Security implementation
- State management across distributed systems
- **Current Focus**: AI agent implementation and API development

## Best Practices

1. Always work on a feature branch
2. Keep PRs focused and small
3. Update documentation as needed
4. Test your changes thoroughly
5. Follow the code review process

## Detailed Contribution Workflow

### 1. Setting Up Your Development Environment

1. **Fork the Repository**
   - Visit [Kuro's GitHub repository](https://github.com/sarvagyakrcs/kuro)
   - Click the "Fork" button in the top-right corner
   - Select your account to create the fork

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/kuro.git
   cd kuro
   ```

3. **Set Up Remotes**
   ```bash
   # Add the upstream repository
   git remote add upstream https://github.com/sarvagyakrcs/kuro.git
   
   # Verify remotes
   git remote -v
   ```

4. **Keep Your Fork Updated**
   ```bash
   # Fetch upstream changes
   git fetch upstream
   
   # Merge upstream changes into your main branch
   git checkout main
   git merge upstream/main
   ```

### 2. Creating a New Feature

1. **Create a New Branch**
   ```bash
   # Make sure you're on main and up-to-date
   git checkout main
   git pull origin main
   
   # Create and switch to a new branch
   git checkout -b feature/your-feature-name
   ```

2. **Set Up the Development Environment**
   ```bash
   # Install dependencies for each vertical
   cd kuro-frontend && bun install
   cd ../kuro-backend && bun install
   cd ../kuro-marketing && bun install
   ```

3. **Start the Development Server**
   ```bash
   # For frontend
   cd kuro-frontend
   bun run dev
   
   # For backend
   cd kuro-backend
   bun run start
   
   # For marketing
   cd kuro-marketing
   bun run dev
   ```

### 3. Making Changes

1. **Code Style**
   - Follow TypeScript best practices
   - Use meaningful variable and function names
   - Add comments for complex logic
   - Keep functions small and focused

2. **Commit Your Changes**
   ```bash
   # Stage your changes
   git add .
   
   # Commit with a descriptive message following Conventional Commits
   git commit -m "feat: add new AI agent capability"
   
   # Common commit types:
   # feat:     New feature
   # fix:      Bug fix
   # docs:     Documentation changes
   # style:    Formatting, missing semicolons, etc.
   # refactor: Code restructuring
   # test:     Adding tests
   # chore:    Maintenance tasks
   ```

3. **Testing Your Changes**
   ```bash
   # Run tests
   bun test
   
   # Run linter
   bun run lint
   
   # Run type checking
   bun run type-check
   ```

### 4. Submitting Your Contribution

1. **Push Your Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "Pull Request"
   - Select your feature branch
   - Click "Create Pull Request"

3. **Pull Request Template**
   ```markdown
   ## Description
   Brief description of your changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Code refactor
   
   ## Testing Done
   Describe how you tested your changes
   
   ## Screenshots (if applicable)
   Add screenshots here
   
   ## Checklist
   - [ ] My code follows the project's style guidelines
   - [ ] I have performed a self-review
   - [ ] I have added tests that prove my fix/feature works
   - [ ] I have updated the documentation
   ```

### 5. Review Process

1. **Automated Checks**
   - Wait for CI/CD pipelines to complete
   - Address any failing checks

2. **Code Review**
   - Maintainers will review your code
   - Address any feedback
   - Make requested changes
   ```bash
   # Make changes and commit
   git add .
   git commit -m "fix: address review feedback"
   git push origin feature/your-feature-name
   ```

3. **Final Steps**
   - Once approved, your PR will be merged
   - Delete your feature branch
   ```bash
   git checkout main
   git branch -D feature/your-feature-name
   ```

### 6. Best Practices

1. **Keep PRs Small**
   - Focus on one feature/fix per PR
   - Break large features into smaller PRs
   - Easier to review and merge

2. **Stay Updated**
   ```bash
   # Regularly sync with upstream
   git fetch upstream
   git rebase upstream/main
   ```

3. **Communication**
   - Respond to reviews promptly
   - Ask questions if unclear
   - Join discussions on issues

4. **Documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update API documentation

### 7. Troubleshooting

1. **Common Issues**
   ```bash
   # Resolve merge conflicts
   git fetch upstream
   git merge upstream/main
   # Fix conflicts in your editor
   git add .
   git commit -m "fix: resolve merge conflicts"
   
   # Undo last commit (not pushed)
   git reset --soft HEAD~1
   
   # Undo last commit (pushed)
   git revert HEAD
   git push origin feature/your-feature-name
   ```

2. **Getting Help**
   - Check the documentation
   - Search existing issues
   - Ask in discussions
   - Join our Discord community

Thank you for contributing to Kuro! We look forward to your contributions. 
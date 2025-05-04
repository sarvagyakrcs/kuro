import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Heading, Subheading } from "@/components/ui/heading"
import { Text, Strong } from "@/components/ui/text"
import { Divider } from "@/components/ui/divider"
import { SparkleIcon } from "@/components/ui/sparkle-icon"
import { PROJECT_NAME } from "@/metadata"
import {
  Beaker,
  Brain,
  Compass,
  Database,
  FileText,
  Globe,
  Heart,
  Key,
  Layers,
  Lock,
  Rocket,
  Server,
  Settings,
  Shield,
  Upload,
  Users,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: `Documentation - ${PROJECT_NAME}`,
  description: "Comprehensive documentation for the AI Course Generator platform",
}

export default function DocumentationPage() {
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-xl border border-zinc-200 bg-white/50 p-6 sm:p-8 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="space-y-4">
            <Badge color="purple" className="mb-2">
              <SparkleIcon className="mr-1 h-4 w-4" />
              <span>Documentation</span>
            </Badge>
            <div className="space-y-2">
              <Heading className="text-3xl font-bold tracking-tight sm:text-4xl">
                AI Course Generator Platform
              </Heading>
              <Text className="max-w-3xl text-zinc-500 dark:text-zinc-400">
                A comprehensive guide to the architecture, features, and innovations
                of our AI-powered educational platform.
              </Text>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Compass className="h-5 w-5 text-purple-500" />
            <Heading level={2} className="text-2xl font-bold">Platform Overview</Heading>
          </div>
          <Divider />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Brain className="h-6 w-6 text-emerald-500" />}
              title="AI-Powered Course Generation"
              description="Create comprehensive courses tailored to specific topics using advanced AI models."
            />
            <FeatureCard
              icon={<Lock className="h-6 w-6 text-blue-500" />}
              title="Secure Authentication"
              description="Role-based access control with NextAuth v5 integration for secure user management."
            />
            <FeatureCard
              icon={<Heart className="h-6 w-6 text-rose-500" />}
              title="Modern UI/UX"
              description="Clean, responsive interface built with React 19, Next.js 15, and Tailwind CSS 4."
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6 text-amber-500" />}
              title="Content Management"
              description="Organize and structure educational materials with intuitive interfaces."
            />
            <FeatureCard
              icon={<Upload className="h-6 w-6 text-indigo-500" />}
              title="File Uploads"
              description="Support for various document formats (PDF, DOCX) with automatic content extraction."
            />
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-yellow-500" />}
              title="API Integration"
              description="Seamless connections with AI services like Groq and LangChain for content generation."
            />
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Layers className="h-5 w-5 text-blue-500" />
            <Heading level={2} className="text-2xl font-bold">Technical Architecture</Heading>
          </div>
          <Divider />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <Server className="h-5 w-5 text-blue-500" />
                  </div>
                  <Heading level={3} className="text-xl font-semibold">Backend Technology</Heading>
                </div>
                <div className="ml-1 space-y-3">
                  <ArchitectureItem
                    title="Next.js API Routes"
                    description="Server-side API endpoints for handling data operations and business logic."
                  />
                  <ArchitectureItem
                    title="Prisma ORM"
                    description="Type-safe database access with automated migrations and schema management."
                  />
                  <ArchitectureItem
                    title="PostgreSQL"
                    description="Relational database with vector extension for AI embeddings and similarity search."
                  />
                  <ArchitectureItem
                    title="Redis"
                    description="In-memory data store for caching and real-time operations."
                  />
                  <ArchitectureItem
                    title="AWS S3 Compatible Storage"
                    description="Object storage for course materials and user uploads."
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <Globe className="h-5 w-5 text-purple-500" />
                  </div>
                  <Heading level={3} className="text-xl font-semibold">Frontend Framework</Heading>
                </div>
                <div className="ml-1 space-y-3">
                  <ArchitectureItem
                    title="React 19"
                    description="Latest React version with modern features and improved performance."
                  />
                  <ArchitectureItem
                    title="Next.js 15"
                    description="React framework with server components, app router, and optimized rendering."
                  />
                  <ArchitectureItem
                    title="Tailwind CSS 4"
                    description="Utility-first CSS framework for rapid UI development."
                  />
                  <ArchitectureItem
                    title="Framer Motion"
                    description="Animation library for creating smooth, interactive UI elements."
                  />
                  <ArchitectureItem
                    title="React Three Fiber"
                    description="React renderer for Three.js, enabling 3D visuals like the interactive globe."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Integration */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-emerald-500" />
            <Heading level={2} className="text-2xl font-bold">AI Integration</Heading>
          </div>
          <Divider />
          
          <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-white to-emerald-50/30 p-6 dark:border-zinc-800 dark:bg-zinc-900 dark:from-zinc-900 dark:to-emerald-950/10">
            <div className="space-y-6">
              <div className="space-y-2">
                <Subheading className="text-xl font-semibold">Key AI Features</Subheading>
                <Text className="text-zinc-600 dark:text-zinc-400">
                  The platform leverages multiple AI technologies to deliver intelligent content generation and learning experiences.
                </Text>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AIFeatureCard
                  title="Course Generation"
                  description="AI-powered creation of comprehensive course structures based on topic, level, and desired outcomes."
                  model="Qwen-QWQ-32B"
                />
                <AIFeatureCard
                  title="Module Content Generation"
                  description="Automated creation of detailed educational content in multiple formats (text, quizzes, MD)."
                  model="Llama3-70B"
                />
                <AIFeatureCard
                  title="Quiz Generation"
                  description="Intelligent creation of assessment questions and answers based on course content."
                  model="Llama3-70B"
                />
                <AIFeatureCard
                  title="Document Processing"
                  description="Extraction and embedding of knowledge from uploaded documents for course integration."
                  model="Custom Embeddings"
                />
                <AIFeatureCard
                  title="Content Summarization"
                  description="Automatic summarization of educational materials for quick review."
                  model="Groq API"
                />
                <AIFeatureCard
                  title="Vector Search"
                  description="Semantic similarity search for finding relevant course materials and knowledge."
                  model="PostgreSQL Vector"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Innovative Features */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Beaker className="h-5 w-5 text-amber-500" />
            <Heading level={2} className="text-2xl font-bold">Innovative Features</Heading>
          </div>
          <Divider />
          
          <div className="space-y-6">
            <InnovationCard
              title="Event Orchestration System"
              description="A sophisticated event orchestration system for managing complex workflows, like course creation, with parallel processing and dependency management."
              icon={<Settings className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />}
            />
            
            <InnovationCard
              title="Document Knowledge Extraction"
              description="Intelligent parsing and semantic understanding of uploaded documents, extracting structured knowledge and embedding it for retrieval."
              icon={<FileText className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />}
            />
            
            <InnovationCard
              title="Interactive 3D Globe Visualization"
              description="A beautiful Three.js-powered interactive globe component for visualizing global course distribution and user engagement."
              icon={<Globe className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />}
            />
            
            <InnovationCard
              title="Adaptive Quiz Generation"
              description="AI-generated quizzes that adapt to course content and learning objectives, with intelligent question and distractor creation."
              icon={<Brain className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />}
            />
            
            <InnovationCard
              title="Real-time Collaborative Learning"
              description="Tools for real-time collaboration, discussions, and peer learning within course modules."
              icon={<Users className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />}
            />
          </div>
        </section>

        {/* Database Schema */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-indigo-500" />
            <Heading level={2} className="text-2xl font-bold">Database Schema</Heading>
          </div>
          <Divider />
          
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <div className="grid gap-0 divide-y divide-zinc-200 dark:divide-zinc-800">
              <SchemaCard
                name="User"
                description="User accounts with authentication, profile details, and role-based access."
                fields={[
                  "id, name, email, emailVerified", 
                  "firstName, lastName, profilePic", 
                  "password, role (ADMIN, USER)"
                ]}
              />
              
              <SchemaCard
                name="Course"
                description="Educational courses with metadata, settings, and relationship to modules."
                fields={[
                  "id, name, description, outcome",
                  "currentLevel, targetAudience",
                  "createdAt, updatedAt, published"
                ]}
              />
              
              <SchemaCard
                name="Module"
                description="Course modules of various types (VIDEO, TEXT, QUIZ, MD, CHART)."
                fields={[
                  "id, name, description, content",
                  "moduleType, order, videoUrl, thumbnailUrl",
                  "courseId, createdAt, updatedAt"
                ]}
              />
              
              <SchemaCard
                name="Quiz & Questions"
                description="Assessment components with questions, options, and correct answers."
                fields={[
                  "Quiz: id, title, description, moduleId",
                  "Question: id, question, quizId",
                  "Option: id, option, correct, questionId"
                ]}
              />
              
              <SchemaCard
                name="UserCourse"
                description="Relationship between users and courses, tracking progress and permissions."
                fields={[
                  "id, userId, courseId",
                  "role, progress, completedAt",
                  "createdAt, updatedAt"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-500" />
            <Heading level={2} className="text-2xl font-bold">Security Features</Heading>
          </div>
          <Divider />
          
          <div className="grid gap-6 sm:grid-cols-2">
            <SecurityCard
              title="Authentication"
              items={[
                "NextAuth v5 integration",
                "Password hashing with bcrypt",
                "JWT-based session management",
                "OAuth providers support",
                "Email verification workflow"
              ]}
            />
            
            <SecurityCard
              title="Authorization"
              items={[
                "Role-based access control",
                "Course-level permissions",
                "Protected API routes",
                "Middleware security checks",
                "Session validation"
              ]}
            />
          </div>
        </section>

        {/* RAG Pipeline & Document Processing */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-amber-500" />
            <Heading level={2} className="text-2xl font-bold">RAG Pipeline & Document Processing</Heading>
          </div>
          <Divider />
          
          <div className="rounded-xl border border-zinc-200 bg-gradient-to-br from-white to-amber-50/30 p-6 dark:border-zinc-800 dark:bg-zinc-900 dark:from-zinc-900 dark:to-amber-950/10">
            <div className="space-y-6">
              <div className="space-y-2">
                <Subheading className="text-xl font-semibold">Intelligent Document Processing</Subheading>
                <Text className="text-zinc-600 dark:text-zinc-400">
                  The platform features a sophisticated Retrieval-Augmented Generation (RAG) pipeline that processes uploaded documents, 
                  extracts knowledge, and uses it to enhance AI-generated content.
                </Text>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-white/80 p-5 overflow-hidden relative dark:border-zinc-800 dark:bg-zinc-900/70">
                  <div className="z-10 relative space-y-3">
                    <Badge color="amber" className="mb-1">
                      <SparkleIcon className="mr-1 h-3 w-3" />
                      <span>Document Processing</span>
                    </Badge>
                    <Heading level={3} className="text-lg font-semibold">Multi-Format Support</Heading>
                    <div className="space-y-2">
                      <DocProcessingFeature title="PDF Documents" description="Extracts text content from PDF files using PDFLoader from LangChain." />
                      <DocProcessingFeature title="Word Documents" description="Processes DOCX/DOC files using Mammoth for content extraction." />
                      <DocProcessingFeature title="Presentations" description="Extracts content from PowerPoint (PPTX/PPT) files." />
                      <DocProcessingFeature title="Spreadsheets" description="Parses CSV files with PapaParse for structured data extraction." />
                      <DocProcessingFeature title="Plain Text & Markdown" description="Direct processing of TXT and MD files for content integration." />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-10"></div>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white/80 p-5 overflow-hidden relative dark:border-zinc-800 dark:bg-zinc-900/70">
                  <div className="z-10 relative space-y-3">
                    <Badge color="blue" className="mb-1">
                      <SparkleIcon className="mr-1 h-3 w-3" />
                      <span>Embedding Pipeline</span>
                    </Badge>
                    <Heading level={3} className="text-lg font-semibold">Knowledge Extraction & Embedding</Heading>
                    <div className="space-y-2">
                      <DocProcessingFeature title="AI Summarization" description="Documents are summarized using AI to extract key concepts and knowledge." />
                      <DocProcessingFeature title="Vector Embeddings" description="Summaries are embedded into high-dimensional vectors for semantic retrieval." />
                      <DocProcessingFeature title="PostgreSQL Vector Storage" description="Embeddings stored in Postgres with vector extension for efficient similarity search." />
                      <DocProcessingFeature title="Parallel Processing" description="Multiple documents processed simultaneously for efficient course creation." />
                      <DocProcessingFeature title="Error Handling & Retries" description="Robust retry mechanisms ensure reliable processing of all documents." />
                    </div>
                  </div>
                  <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-10"></div>
                </div>
              </div>

              <div className="mt-6">
                <Heading level={3} className="text-xl font-semibold mb-4">RAG Pipeline Workflow</Heading>
                <div className="relative overflow-hidden rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
                  <ol className="relative space-y-6 border-l border-dashed border-zinc-300 pl-6 dark:border-zinc-700">
                    <RagStepItem 
                      number="1" 
                      title="Document Upload" 
                      description="Course creators upload documents (PDF, DOCX, etc.) that contain relevant educational content." 
                    />
                    <RagStepItem 
                      number="2" 
                      title="Text Extraction" 
                      description="The system extracts raw text from documents using format-specific loaders." 
                    />
                    <RagStepItem 
                      number="3" 
                      title="AI Summarization" 
                      description="AI generates comprehensive summaries capturing key concepts and knowledge from each document." 
                    />
                    <RagStepItem 
                      number="4" 
                      title="Vector Embedding" 
                      description="Summaries are transformed into vector embeddings using AI embedding models." 
                    />
                    <RagStepItem 
                      number="5" 
                      title="Database Storage" 
                      description="Embeddings and summaries are stored in PostgreSQL with vector extension for retrieval." 
                    />
                    <RagStepItem 
                      number="6" 
                      title="Content Enrichment" 
                      description="AI-generated course content is enhanced with knowledge from these documents via similarity search." 
                    />
                    <RagStepItem 
                      number="7" 
                      title="Context Integration" 
                      description="Module generation, quiz creation, and content suggestions leverage document knowledge." 
                    />
                  </ol>
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <Heading level={3} className="text-lg font-semibold mb-3">Similarity Search Applications</Heading>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      <Text className="text-sm">Course modules pull relevant context from document embeddings</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      <Text className="text-sm">Quiz questions are generated based on most similar document sections</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      <Text className="text-sm">Video recommendations match most relevant document content</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      <Text className="text-sm">AI completions for students are contextually enhanced</Text>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
                  <Heading level={3} className="text-lg font-semibold mb-3">Technical Implementation</Heading>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      <Text className="text-sm">Parallel processing with Promise.all for multiple documents</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      <Text className="text-sm">PostgreSQL vector similarity using cosine distance (&lt;=&gt; operator)</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      <Text className="text-sm">AI-optimized summary generation with retry mechanisms</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-500 dark:bg-amber-900/30">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      </span>
                      <Text className="text-sm">Automatic cleanup of temporary files after processing</Text>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Implementation Details */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-violet-500" />
            <Heading level={2} className="text-2xl font-bold">Technical Implementation Details</Heading>
          </div>
          <Divider />
          
          <div className="grid gap-6">
            {/* Event Orchestration System */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40">
                    <Settings className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <Heading level={3} className="text-xl font-semibold">Event Orchestration System</Heading>
                </div>
                
                <Text>
                  A custom-built asynchronous workflow engine that manages complex operations with dependencies.
                  The system orchestrates parallel and sequential tasks during course creation and other workflows.
                </Text>
                
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <Subheading className="text-base font-semibold mb-3">Implementation Highlights</Subheading>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
                      <Strong className="text-sm">Topological Sorting Algorithm</Strong>
                      <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                        Uses in-degree tracking to process events in dependency order. Tasks with no dependencies execute first, 
                        followed by tasks whose dependencies have completed.
                      </Text>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
                      <Strong className="text-sm">Parallel Task Execution</Strong>
                      <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                        Tasks at the same dependency level are executed concurrently using Promise.all(), 
                        optimizing performance during resource-intensive operations.
                      </Text>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
                      <Strong className="text-sm">Error Resilience</Strong>
                      <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                        Error handling ensures the system continues execution even when individual tasks fail, 
                        tracking error states for later inspection and recovery.
                      </Text>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
                      <Strong className="text-sm">State Preservation</Strong>
                      <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                        Each event maintains its own result state, allowing downstream tasks to access 
                        outputs from previously executed dependencies.
                      </Text>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                  <div className="bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                    <Text className="text-sm font-mono">Sample Event Orchestration Graph</Text>
                  </div>
                  <div className="bg-white px-4 py-3 overflow-x-auto dark:bg-zinc-900">
                    <pre className="text-xs overflow-x-auto font-mono text-zinc-800 dark:text-zinc-300">
{`// Define the event graph for course creation workflow
adjList.set(authEvent, [validateDataEvent]);
adjList.set(validateDataEvent, [createDbCourseEvent]);
adjList.set(createDbCourseEvent, [
  createUserCourseEvent,  // Executes in parallel
  uploadNotesEvent,       // Executes in parallel
  createAiModulesEvent    // Executes in parallel
]);
adjList.set(createAiModulesEvent, [uploadModulesToDBEvent]);
adjList.set(uploadModulesToDBEvent, [sendNotificationEvent]);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Vector Database Integration */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                    <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <Heading level={3} className="text-xl font-semibold">Vector Database Integration</Heading>
                </div>
                
                <Text>
                  The platform leverages the PostgreSQL vector extension to store and query high-dimensional 
                  embeddings for semantic search capabilities without requiring a dedicated vector database.
                </Text>
                
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <Subheading className="text-base font-semibold mb-3">Technical Details</Subheading>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
                      <Strong className="text-sm">Embedding Dimensions</Strong>
                      <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                        Uses 768-dimensional vectors from Google's text-embedding-004 model, optimized for 
                        semantic similarity search in educational content.
                      </Text>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
                      <Strong className="text-sm">Vector Storage</Strong>
                      <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                        Stored as a custom PostgreSQL vector type in the CourseAttachment model, enabling 
                        direct database-level vector operations.
                      </Text>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
                      <Strong className="text-sm">Similarity Search</Strong>
                      <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                        Implements cosine similarity using the PostgreSQL &lt;=&gt; operator for efficient 
                        semantic matching between queries and stored embeddings.
                      </Text>
                    </div>
                    <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-800">
                      <Strong className="text-sm">Extension Installation</Strong>
                      <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                        Automatically installs and configures the vector extension during application setup, 
                        simplifying deployment and database management.
                      </Text>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                  <div className="bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                    <Text className="text-sm font-mono">Vector Similarity Query Example</Text>
                  </div>
                  <div className="bg-white px-4 py-3 overflow-x-auto dark:bg-zinc-900">
                    <pre className="text-xs overflow-x-auto font-mono text-zinc-800 dark:text-zinc-300">
{`// Find documents most similar to a query embedding
const result = await prisma.$queryRaw\`
  SELECT "name", "url", "summary",
  1 - ("summaryEmbedding" <=> \${embedding}::vector) AS CosineSimilarity
  FROM "CourseAttachment"
  ORDER BY CosineSimilarity DESC
  LIMIT 10
\` as { name: string, url: string, summary: string, CosineSimilarity: number }[];`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI Model Integration */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
                    <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <Heading level={3} className="text-xl font-semibold">Advanced AI Model Integration</Heading>
                </div>
                
                <Text>
                  The platform integrates multiple large language models and AI services through a unified API abstraction, 
                  enabling specialized models for different content generation tasks.
                </Text>
                
                <div className="grid gap-5 mt-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800/70">
                    <Subheading className="text-base font-semibold mb-3">Streaming Implementation</Subheading>
                    <Text className="text-sm mb-3 text-zinc-600 dark:text-zinc-400">
                      Real-time content streaming provides immediate feedback to users during generation 
                      of long-form educational content.
                    </Text>
                    <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                      <div className="bg-white px-4 py-3 overflow-x-auto dark:bg-zinc-900">
                        <pre className="text-xs overflow-x-auto font-mono text-zinc-800 dark:text-zinc-300">
{`// Streaming text generation example
const stream = streamText({
  model: groq("llama3-70b-8192"),
  system: \`You are an expert educational content creator.\`,
  prompt: \`Create notes for: \${module.name}\`,
  temperature: 0.7,
  maxTokens: 6000,
});

// Returns a streaming response
return stream.toDataStreamResponse();`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800/70">
                    <Subheading className="text-base font-semibold mb-3">Structured Output Generation</Subheading>
                    <Text className="text-sm mb-3 text-zinc-600 dark:text-zinc-400">
                      Uses JSON schema validation to ensure AI outputs match expected data structures for quizzes, 
                      course modules, and other structured content.
                    </Text>
                    <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                      <div className="bg-white px-4 py-3 overflow-x-auto dark:bg-zinc-900">
                        <pre className="text-xs overflow-x-auto font-mono text-zinc-800 dark:text-zinc-300">
{`// Structured object generation with validation
const { object: quizData } = await generateObject({
  model: groq("llama3-70b-8192"),
  schema: QuizSchema, // Zod schema for validation
  system: \`Create a comprehensive quiz\`,
  prompt: \`Create quiz for: \${module.name}\`,
  temperature: 0.2,
  maxTokens: 4000,
});`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <Subheading className="text-base font-semibold mb-3">AI Model Selection Strategy</Subheading>
                  <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <div className="grid gap-3">
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        <div className="col-span-1 font-medium">Task Type</div>
                        <div className="col-span-1 font-medium">Model</div>
                        <div className="col-span-3 font-medium">Technical Rationale</div>
                      </div>
                      <Divider className="my-1" />
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        <div className="col-span-1">Course Structure</div>
                        <div className="col-span-1">Qwen-QWQ-32B</div>
                        <div className="col-span-3 text-zinc-600 dark:text-zinc-400">
                          Superior knowledge organization and structured output capabilities with 32B parameters
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        <div className="col-span-1">Content Generation</div>
                        <div className="col-span-1">Llama3-70B</div>
                        <div className="col-span-3 text-zinc-600 dark:text-zinc-400">
                          Optimal markdown generation, code examples, and educational explanations with 70B parameters
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        <div className="col-span-1">Quiz Creation</div>
                        <div className="col-span-1">Llama3-70B</div>
                        <div className="col-span-3 text-zinc-600 dark:text-zinc-400">
                          Advanced reasoning for distractor generation and precise question formulation
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        <div className="col-span-1">Embeddings</div>
                        <div className="col-span-1">Google-E004</div>
                        <div className="col-span-3 text-zinc-600 dark:text-zinc-400">
                          768-dimensional vectors optimized for semantic similarity with high information density
                        </div>
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-xs">
                        <div className="col-span-1">Summarization</div>
                        <div className="col-span-1">Groq API</div>
                        <div className="col-span-3 text-zinc-600 dark:text-zinc-400">
                          Low-latency processing of document content with high compression ratio while maintaining key concepts
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real-time Features & Error Handling */}
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                    <Shield className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <Heading level={3} className="text-xl font-semibold">Resilience & Error Handling</Heading>
                </div>
                
                <Text>
                  The platform implements robust error handling and recovery mechanisms to ensure reliability 
                  during complex operations involving external AI services and file processing.
                </Text>
                
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
                    <Strong className="text-sm">Exponential Backoff Retry</Strong>
                    <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                      AI service calls implement exponential backoff with configurable retry limits to handle 
                      transient failures and rate limiting from external APIs.
                    </Text>
                    <div className="mt-2 rounded overflow-hidden border border-zinc-100 dark:border-zinc-700">
                      <pre className="text-xs p-2 bg-zinc-50 overflow-x-auto font-mono text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300">
{`// Retry with exponential backoff
while (attempts < maxAttempts) {
  try {
    return await aiServiceCall();
  } catch (error) {
    attempts++;
    
    if (attempts < maxAttempts) {
      const delayMs = Math.pow(2, attempts) * 1000;
      await new Promise(resolve => 
        setTimeout(resolve, delayMs)
      );
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
                    <Strong className="text-sm">Resource Cleanup</Strong>
                    <Text className="text-xs mt-1 text-zinc-500 dark:text-zinc-400">
                      Temporary file handling with guaranteed cleanup through finally blocks and delete hooks,
                      preventing resource leaks during document processing.
                    </Text>
                    <div className="mt-2 rounded overflow-hidden border border-zinc-100 dark:border-zinc-700">
                      <pre className="text-xs p-2 bg-zinc-50 overflow-x-auto font-mono text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-300">
{`// Resource cleanup pattern
const deleteFile = async () => {
  try {
    await rm(filePath);
    console.log(\`Deleted \${filePath}\`);
  } catch (error) {
    console.error(\`Error deleting \${filePath}\`);
  }
};

try {
  // Process file...
} finally {
  // Always execute cleanup
  await deleteFile();
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                  <Subheading className="text-base font-semibold mb-3">Fault Tolerance Strategies</Subheading>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                      </span>
                      <Text className="text-sm">Graceful degradation when AI services are unavailable or return unexpected results</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                      </span>
                      <Text className="text-sm">Parameter validation using Zod schemas before expensive operations</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                      </span>
                      <Text className="text-sm">Content length truncation to prevent token limit errors in AI models</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                      </span>
                      <Text className="text-sm">Transactional database operations to maintain data consistency</Text>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Deployment & Performance */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Rocket className="h-5 w-5 text-sky-500" />
            <Heading level={2} className="text-2xl font-bold">Deployment & Performance</Heading>
          </div>
          <Divider />
          
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="space-y-6">
              <div className="space-y-2">
                <Subheading className="text-lg font-semibold">Optimization Strategies</Subheading>
                <Text className="text-zinc-600 dark:text-zinc-400">
                  The platform employs multiple strategies to ensure optimal performance and user experience.
                </Text>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <PerformanceCard title="Server Components" description="Leverages Next.js server components for improved initial load performance." />
                <PerformanceCard title="Edge Caching" description="Content delivery network integration for global low-latency access." />
                <PerformanceCard title="API Optimization" description="Batched and parallel API requests for efficient data fetching." />
                <PerformanceCard title="Image Optimization" description="Automatic image resizing, format conversion, and lazy loading." />
                <PerformanceCard title="Code Splitting" description="Dynamic imports and component lazy loading to reduce bundle size." />
                <PerformanceCard title="Streaming Responses" description="AI content is streamed to improve perceived performance." />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="text-center">
            <Text className="text-zinc-500 dark:text-zinc-400">
              Built with <span className="text-rose-500">♥</span> using Next.js, React, and Tailwind CSS
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

// UI Components
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="space-y-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
          {icon}
        </div>
        <Heading level={3} className="text-lg font-semibold">{title}</Heading>
        <Text className="text-zinc-500 dark:text-zinc-400">{description}</Text>
      </div>
      <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-10"></div>
    </div>
  )
}

function ArchitectureItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="rounded-lg border border-zinc-100 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Strong className="text-sm font-medium">{title}</Strong>
      <Text className="text-xs text-zinc-500 dark:text-zinc-400">{description}</Text>
    </div>
  )
}

function AIFeatureCard({ title, description, model }: { title: string, description: string, model: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white/80 p-5 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-700">
      <div className="space-y-3">
        <Badge color="emerald" className="mb-1">
          <SparkleIcon className="mr-1 h-3 w-3" />
          <span>{model}</span>
        </Badge>
        <Heading level={3} className="text-lg font-semibold">{title}</Heading>
        <Text className="text-sm text-zinc-500 dark:text-zinc-400">{description}</Text>
      </div>
      <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-10"></div>
    </div>
  )
}

function InnovationCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex flex-col sm:flex-row sm:items-start">
        <div className="mb-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mb-0 sm:mr-6 dark:bg-amber-900/30">
          {icon}
        </div>
        <div>
          <Heading level={3} className="mb-2 text-xl font-semibold">{title}</Heading>
          <Text className="text-zinc-500 dark:text-zinc-400">{description}</Text>
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-10"></div>
    </div>
  )
}

function SchemaCard({ name, description, fields }: { name: string, description: string, fields: string[] }) {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
          <Key className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
        </div>
        <Heading level={3} className="text-lg font-semibold">{name}</Heading>
      </div>
      <Text className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</Text>
      <div className="mt-3 space-y-1">
        {fields.map((field, i) => (
          <div key={i} className="rounded-md bg-zinc-50 px-3 py-1.5 text-xs font-mono dark:bg-zinc-800/50">
            {field}
          </div>
        ))}
      </div>
    </div>
  )
}

function SecurityCard({ title, items }: { title: string, items: string[] }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Shield className="h-5 w-5 text-red-500" />
          </div>
          <Heading level={3} className="text-xl font-semibold">{title}</Heading>
        </div>
        <ul className="ml-4 space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="mr-2 mt-1 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-900/30">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
              </span>
              <Text className="text-zinc-600 dark:text-zinc-400">{item}</Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PerformanceCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="rounded-lg border border-zinc-100 bg-gradient-to-b from-white to-zinc-50/50 p-4 shadow-sm dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/60">
      <Heading level={4} className="mb-1 text-base font-medium">{title}</Heading>
      <Text className="text-sm text-zinc-500 dark:text-zinc-400">{description}</Text>
    </div>
  )
}

function DocProcessingFeature({ title, description }: { title: string, description: string }) {
  return (
    <div className="rounded-lg border border-zinc-100 bg-white p-3 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Strong className="text-sm font-medium">{title}</Strong>
      <Text className="text-xs text-zinc-500 dark:text-zinc-400">{description}</Text>
    </div>
  )
}

function RagStepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <li className="relative">
      <div className="absolute -left-[29px] flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white shadow-md shadow-amber-500/25">
        {number}
      </div>
      <div className="space-y-1">
        <Strong className="text-base font-semibold">{title}</Strong>
        <Text className="text-sm text-zinc-500 dark:text-zinc-400">{description}</Text>
      </div>
    </li>
  )
} 
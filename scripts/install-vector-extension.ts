import { prisma } from "@/lib/db/prisma";

async function installVectorExtension() {
  try {
    // Check if the vector extension is already installed
    const extensionCheck = await prisma.$queryRaw`
      SELECT * FROM pg_extension WHERE extname = 'vector'
    `;
    
    console.log("Extension check result:", extensionCheck);
    
    // If the extension isn't installed, try to install it
    if (!Array.isArray(extensionCheck) || (extensionCheck as any[]).length === 0) {
      console.log("Vector extension not found, trying to install...");
      
      try {
        // Try to create the extension
        await prisma.$executeRaw`CREATE EXTENSION IF NOT EXISTS vector`;
        console.log("Vector extension installed successfully!");
      } catch (error) {
        console.error("Error installing vector extension:", error);
      }
    } else {
      console.log("Vector extension is already installed.");
    }
    
    // Verify the CourseAttachment table structure
    const columnCheck = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'CourseAttachment' AND column_name = 'summaryEmbedding'
    `;
    
    console.log("CourseAttachment summaryEmbedding column:", columnCheck);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
installVectorExtension()
  .then(() => console.log("Done!"))
  .catch((error) => console.error("Script failed:", error)); 
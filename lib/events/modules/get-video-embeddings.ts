import { VideoResult } from "@/actions/youtube/get-videos";
import { prisma } from "@/lib/db/prisma";
import { embeddingModel } from "@/lib/embedding-model";
import { embed } from "ai";

export const getMostSimilarVideoToNotes = async (videos: VideoResult[]) => {
   // Check if there are any notes in the database
   const notesCount = await prisma.courseAttachment.count();
   if (notesCount === 0 || videos.length === 0) {
     return videos[0]; // Return first video if there are no notes or no videos
   }

   const similarityMap = new Map<string, { video: VideoResult, similarity: number }>();
   
   for(const video of videos){
     try {
       // Skip videos with missing or empty transcripts
       if (!video.transcript || video.transcript.trim().length === 0) {
         console.log(`Skipping video with no transcript: ${video.title}`);
         continue;
       }

       const { embedding } = await embed({
         model: embeddingModel,
         value: video.transcript.slice(0, 8000)
       });
       
       // calculate score by dot product of embedding and summaryEmbedding of all notes then pick most similar
       const result = await prisma.$queryRaw`
         SELECT "name", "url", "summary",
         1 - ("summaryEmbedding" <=> ${embedding}::vector) AS CosineSimilarity
         FROM "CourseAttachment"
         ORDER BY CosineSimilarity DESC
         LIMIT 10
       ` as { name: string, url: string, summary: string, CosineSimilarity: number }[];
       
       // Store the highest similarity score for this video
       if (result.length > 0) {
         similarityMap.set(video.link, { video, similarity: result[0].CosineSimilarity });
       }
     } catch (error) {
       console.error(`Error processing video ${video.title}:`, error);
       // Continue with the next video instead of failing the whole process
     }
   }
  
   // If no similarities were found, return the first video
   if (similarityMap.size === 0) {
     return videos[0];
   }

   // Find the video with the highest similarity score
   let highestSimilarity = 0;
   let mostSimilarVideo = videos[0];
   
   for (const [_, data] of similarityMap.entries()) {
     if (data.similarity > highestSimilarity) {
       highestSimilarity = data.similarity;
       mostSimilarVideo = data.video;
     }
   }
  
   return mostSimilarVideo;
}
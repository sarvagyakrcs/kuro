import axios from 'axios';
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";

/**
 * Represents a video search result with detailed information
 */
interface VideoResult {
  title: string;
  link: string;
  thumbnailUrl: string;
  transcript: string;
  videoInfo?: {
    description: string;
    channel: string;
    publishedAt: string;
  };
}

/**
 * Fetches video search results based on a query
 * @param query - The search term to look for videos
 * @param limit - Maximum number of results to return (between 3-5, defaults to 5)
 * @param language - ISO 639-1 language code for transcript (defaults to 'en')
 * @returns Promise resolving to an array of video results
 */
export async function searchVideos(
  query: string, 
  limit: number = 5, 
  language: string = 'en'
): Promise<VideoResult[]> {
  // Validate and constrain the limit between 3-5
  const validLimit = Math.min(Math.max(3, limit), 5);
  
  try {
    // Example with YouTube Data API (you'll need an API key)
    // Replace 'YOUR_API_KEY' with an actual YouTube Data API key
    const API_KEY = process.env.YOUTUBE_API_KEY;
    if(!API_KEY){
      throw new Error("YOUTUBE_API_KEY is not set");
    }
    
    // Step 1: Search for videos
    const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query,
        maxResults: validLimit,
        type: 'video',
        key: API_KEY
      }
    });

    // Step 2: Process search results and get transcripts using LangChain
    const videoResults = await Promise.all(
      searchResponse.data.items.map(async (item: any) => {
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        // Use LangChain's YoutubeLoader to get the transcript
        const transcript = await getVideoTranscriptWithLangChain(videoUrl, language);
        
        return {
          title: item.snippet.title,
          link: videoUrl,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          transcript: transcript,
          videoInfo: {
            description: item.snippet.description,
            channel: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt
          }
        };
      })
    );
    
    return videoResults;
    
  } catch (error) {
    console.error('Error fetching video search results:', error);
    throw new Error(`Failed to search videos: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Helper function to get the transcript of a video using LangChain
 * @param videoUrl - URL of the YouTube video
 * @param language - ISO 639-1 language code for transcript
 * @returns Promise resolving to the transcript text
 */
async function getVideoTranscriptWithLangChain(videoUrl: string, language: string): Promise<string> {
  try {
    // Use LangChain's YoutubeLoader to get the transcript
    const loader = YoutubeLoader.createFromUrl(videoUrl, {
      language: language,
      addVideoInfo: true,
    });
    
    const docs = await loader.load();
    
    // The transcript is available in the pageContent property of the document
    if (docs.length > 0) {
      return docs[0].pageContent;
    } else {
      return "Transcript unavailable";
    }
  } catch (error) {
    console.error(`Error fetching transcript for video ${videoUrl}:`, error);
    return "Transcript unavailable";
  }
}

 // Example usage:
 
async function searchExample() {
  try {
    const results = await searchVideos("TypeScript tutorial", 4);
    console.log(`Found ${results.length} videos:`);
    results.forEach(video => {
      console.log(`- ${video.title}`);
      console.log(`  URL: ${video.link}`);
      console.log(`  Thumbnail: ${video.thumbnailUrl}`);
      console.log(`  Transcript preview: ${video.transcript.substring(0, 100)}...`);
    });
  } catch (error) {
    console.error("Search failed:", error);
  }
}

searchExample()
.then(() => {
  console.log("Search completed");
})
.catch((error) => {
  console.error("Search failed:", error);
});

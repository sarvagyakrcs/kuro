import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

export const getPublicUrl = (key: string) => {
  return `${process.env.R2_PUBLIC_URL}/${key}`;
}

/**
 * Configuration for the R2 client
 */
interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrlPrefix?: string; // Optional CDN/public URL prefix
}

/**
 * Options for file upload
 */
interface UploadOptions {
  contentType?: string;
  metadata?: Record<string, string>;
  cacheControl?: string;
  isPublic?: boolean;
}

/**
 * Response from the upload function
 */
interface UploadResponse {
  success: boolean;
  key: string;
  publicUrl?: string;
  etag?: string;
  error?: Error;
}

/**
 * Creates a utility for uploading files to Cloudflare R2 using S3-compatible API
 */
export class R2UploadUtil {
  private client: S3Client;
  private bucketName: string;
  private publicUrlPrefix?: string;

  /**
   * Creates a new R2 upload utility
   * @param config Configuration for R2 bucket access
   */
  constructor(config: R2Config) {
    console.log("R2UploadUtil constructor called with bucket:", config.bucketName);
    this.bucketName = config.bucketName;
    this.publicUrlPrefix = config.publicUrlPrefix;

    // Create S3 client pointed to Cloudflare R2
    this.client = new S3Client({
      region: "auto", // R2 uses "auto" region
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
    console.log("S3 client created with endpoint:", `https://${config.accountId}.r2.cloudflarestorage.com`);
  }

  /**
   * Uploads a file to R2 bucket
   * 
   * @param fileKey The key (path) where the file will be stored in the bucket
   * @param fileContent The file content as Buffer, Blob, ReadableStream, or string
   * @param options Additional upload options
   * @returns Upload response with status and URL information
   */
  async uploadFile(
    fileKey: string,
    fileContent: Buffer | Blob | Readable | string,
    options: UploadOptions = {}
  ): Promise<UploadResponse> {
    console.log("R2 uploadFile called for key:", fileKey);
    try {
      // Prepare the upload command
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: fileContent,
        ContentType: options.contentType,
        Metadata: options.metadata,
        CacheControl: options.cacheControl,
        ACL: options.isPublic ? "public-read" : undefined,
      });
      
      console.log("PutObjectCommand created with ContentType:", options.contentType);
      console.log("Attempting to upload to bucket:", this.bucketName);

      // Execute the upload
      const result = await this.client.send(command);
      console.log("Upload successful, result:", result);

      // Prepare response
      const response: UploadResponse = {
        success: true,
        key: fileKey,
        etag: result.ETag?.replace(/"/g, ""), // Remove quotes from ETag
      };

      // Add public URL if configured and the file is set to be public
      if (options.isPublic && this.publicUrlPrefix) {
        response.publicUrl = `${this.publicUrlPrefix}/${fileKey}`;
        console.log("Public URL created:", response.publicUrl);
      } else {
        console.log("No public URL created. isPublic:", options.isPublic, "publicUrlPrefix:", !!this.publicUrlPrefix);
      }

      return response;
    } catch (error) {
      console.error("Error in uploadFile:", error);
      return {
        success: false,
        key: fileKey,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  /**
   * Utility method to upload a file from a File or Blob object (useful in browser environments)
   * 
   * @param fileKey The key (path) where the file will be stored
   * @param file Browser File or Blob object
   * @param options Additional upload options
   * @returns Upload response
   */
  async uploadBrowserFile(
    fileKey: string,
    file: File | Blob,
    options: Omit<UploadOptions, "contentType"> = {}
  ): Promise<UploadResponse> {
    console.log("uploadBrowserFile called for:", fileKey);
    console.log("File type:", file instanceof File ? file.type : "Blob");
    console.log("File size:", file.size, "bytes");
    
    try {
      // For server-side processing, we need to convert File/Blob to Buffer
      console.log("Converting file to arrayBuffer");
      const arrayBuffer = await file.arrayBuffer();
      console.log("File converted to arrayBuffer, size:", arrayBuffer.byteLength);
      
      const buffer = Buffer.from(arrayBuffer);
      console.log("ArrayBuffer converted to Buffer, size:", buffer.length);
      
      return this.uploadFile(fileKey, buffer, {
        ...options,
        contentType: file instanceof File ? file.type : undefined,
      });
    } catch (error) {
      console.error("Error in uploadBrowserFile:", error);
      return {
        success: false,
        key: fileKey,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  /**
   * Utility method to generate a unique file key with timestamp to avoid collisions
   * 
   * @param filename Original filename
   * @param prefix Optional path prefix
   * @returns A unique file key
   */
  generateUniqueFileKey(filename: string, prefix: string = ""): string {
    const timestamp = Date.now();
    const cleanPrefix = prefix ? prefix.replace(/^\/|\/$/g, "") + "/" : "";
    const cleanFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `${cleanPrefix}${timestamp}-${cleanFilename}`;
    console.log("Generated unique file key:", key);
    return key;
  }
}

export const uploader = new R2UploadUtil({
  accountId: process.env.R2_ACCOUNT_ID!,
  accessKeyId: process.env.R2_ACCESS_KEY_ID!,
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  bucketName: process.env.R2_BUCKET_NAME!,
  publicUrlPrefix: process.env.R2_PUBLIC_URL,
});

// Log environment variables status at initialization
console.log("R2 environment variables status at init:", {
  accountId: !!process.env.R2_ACCOUNT_ID,
  accessKeyId: !!process.env.R2_ACCESS_KEY_ID,
  secretAccessKey: !!process.env.R2_SECRET_ACCESS_KEY, 
  bucketName: !!process.env.R2_BUCKET_NAME,
  publicUrlPrefix: !!process.env.R2_PUBLIC_URL
});

import { google } from '@ai-sdk/google';

export const embeddingModel = google.textEmbeddingModel('text-embedding-004', {
    outputDimensionality: 768,
    taskType: 'SEMANTIC_SIMILARITY',
});
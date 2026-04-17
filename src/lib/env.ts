/**
 * Centralized environment variable configuration.
 * All process.env access should go through this file.
 * Import from '@/lib/env' in all modules.
 */
export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  AI: {
    GOOGLE_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  AUTH: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  },
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};

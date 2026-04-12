export const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  AI: {
    GOOGLE_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  },
  CLOUDINARY: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  }
}

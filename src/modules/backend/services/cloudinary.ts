import { v2 as cloudinary } from 'cloudinary';
import { env } from '@/lib/env';

// Configure Cloudinary with the environment variables
cloudinary.config({
  cloud_name: env.CLOUDINARY.CLOUD_NAME,
  api_key: env.CLOUDINARY.API_KEY,
  api_secret: env.CLOUDINARY.API_SECRET,
});

export const cloudinaryService = {
  uploadImage: async (fileContent: string, fileName: string): Promise<string> => {
    try {
      // In production, fileContent could be a base64 string or an absolute file path.
      const result = await cloudinary.uploader.upload(fileContent, {
        folder: 'priedu_submissions',
        public_id: fileName,
      });

      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary Upload Error:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  }
};

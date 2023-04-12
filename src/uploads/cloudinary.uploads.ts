import { v2 as cloudinary } from "cloudinary";


interface UploadApiOptions {
    resource_type?: "auto" | "image" | "video" | "raw";
    overwrite?: boolean;
    invalidate?: boolean;
  }

  const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
  });

  const opts: UploadApiOptions = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
  };

  export const imageUploader = async (image: string): Promise<string> => {
    return new Promise(async (resolve, reject) => {
      // Validate image
      console.log(image);
      if (typeof image !== 'string') {
        return reject({ message: 'Invalid image parameter' });
      }
  
      // Upload image to cloudinary
      try {
        const result = await cloudinary.uploader.upload(image, opts);
        if (result && result.secure_url) {
          // Return uploaded image URL
          return resolve(result.secure_url);
        } else {
          // Handle missing secure_url in the response
          return reject({ message: 'Image upload failed' });
        }
      } catch (error) {
        // Handle cloudinary API errors
        console.log(error);
        return reject({ message: 'Image upload failed' });
      }
    });
  };

  
  
  
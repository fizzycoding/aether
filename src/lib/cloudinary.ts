import { v2 as cloudinary } from "cloudinary";
import { env } from "./env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

type UploadAudioOptions = {
  buffer: Buffer;
  key: string;
  folder?: string;
};

export async function uploadAudio({
  buffer,
  key,
  folder = "aether-voices",
}: UploadAudioOptions) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video", 
        public_id: key,
        folder: folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}

export async function deleteAudio(publicId: string) {
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: "video",
  });
}

/**
 * Cloudinary doesn't need "signed URLs" for public viewing by default,
 * but this function helps keep your API consistent.
 */
export function getAudioUrl(publicId: string) {
  return cloudinary.url(publicId, {
    resource_type: "video",
    secure: true,
  });
}

export { cloudinary };

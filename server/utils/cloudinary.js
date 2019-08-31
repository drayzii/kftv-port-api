import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (file) => {
  const video = await cloudinary.uploader.upload(file, {
    resource_type: 'video',
    overwrite: true,
  });
  if (!video) {
    res.status(500).json({
      status: 500,
      message: 'Could not upload image'
    })
  }
  return video;
};

export default upload;

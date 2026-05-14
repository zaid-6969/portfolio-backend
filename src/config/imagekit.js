import dotenv from "dotenv";
dotenv.config();

import ImageKit from "imagekit";
import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage });

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
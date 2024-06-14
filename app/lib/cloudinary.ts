import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "denq9j9dq",
  api_key: "135212156196912",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
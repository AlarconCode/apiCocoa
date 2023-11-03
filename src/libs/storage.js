import multer from "multer";
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'Cocoa',
      resource_type: 'auto',
      allowedFormats: ['jpg', 'jpeg', 'png'],
      path: file.path
    }
  },
});

export const parser = multer({ storage })

// export const multerUpload = multer({
//   storage : multer.memoryStorage({
//     filename: (req, file, cb) => {
//       const fileExtension = extname(file.originalname)
//       const fileName = file.originalname.split(fileExtension)[0]
//       cb(null, `${fileName}-${Date.now()}${fileExtension}`)
//     },
//     fileFilter: (req, file, cb) => {
//       if (MIMETYPES.includes(file.mimetype)) cb(null, true)
//       else cb(new Error(`Only ${MIMETYPES.join(' ')} are allowed`))
//     },
//     limits: {
//       fieldSize: 10000000
//     }
//   })
// })


// import multer from "multer";
// import {dirname, extname, join} from 'path';
// import { fileURLToPath } from "url";

// export const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));
// console.log(CURRENT_DIR);
// const MIMETYPES = ['image/jpeg', 'image/png', 'image/jpg']

// export const multerUpload = multer({
//   storage: multer.diskStorage({
//     destination: join(CURRENT_DIR, '../../uploads'),
//     filename: (req, file, cb) => {
//       const fileExtension = extname(file.originalname)
//       const fileName = file.originalname.split(fileExtension)[0]

//       cb(null, `${fileName}-${Date.now()}${fileExtension}`)
//     }
//   }),
//   fileFilter: (req, file, cb) => {
//     if (MIMETYPES.includes(file.mimetype)) cb(null, true)
//     else cb(new Error(`Only ${MIMETYPES.join(' ')} are allowed`))
//   },
//   limits: {
//     fieldSize: 10000000
//   }
// }); 
 

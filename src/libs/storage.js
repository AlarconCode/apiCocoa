import multer from "multer";
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Cocoa',
    format: async (req, file) => 'jpeg', // supports promises as well
    public_id: (req, file) => file.originalname,
  },
});

export const parser = multer({ storage: storage })

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
 

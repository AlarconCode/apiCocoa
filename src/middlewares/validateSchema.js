import multer from 'multer';

const upload = multer();

// Asegúrate de usar 'upload.none()' si no estás esperando archivos en tu formulario
export const validateSchema = (schema) => async (req, res, next) => {
  upload.any()(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ error: true, code: 400, message: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log('validateSchema', err);
      return res.status(500).json({ error: true, code: 500, message: err.message });
    }

    // Everything went fine.
    console.log('validateBody', req.body);
    console.log('validateFiles', req.files);
    try {
      await schema.validate(req.body, { abortEarly: false });
      console.log('registro validado en el back');
      next();
    } catch (e) {
      return res.status(400).json({ error: true, code: 400, message: e.errors });
    }
  });
};

// export const validateSchema = (schema) => async (req, res, next) => {
//   console.log(req);
//   try {
//     await schema.validate(req.body, { abortEarly: false })
//     console.log('registro validado en el back');
//     next()

//   } catch (e) {

//     return res.status(400).json({ 
//       error: true, 
//       code: 400,
//       message: e.errors 
//     });
//   }

// }
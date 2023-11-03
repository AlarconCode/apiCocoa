import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js";
import { 
  createProduct, 
  deleteProduct, 
  getProduct, 
  getProducts, 
  updateProduct, 
} from '../controller/products.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js';
import { productSchema } from '../schemas/product.schema.js';
import { parser } from '../libs/storage.js';
import { cloudinaryConfig } from '../libs/cloudinary.js';


const productRouter = Router()

productRouter.get('/products', getProducts)
productRouter.get('/products/:cat', getProducts)
productRouter.get('/product/:id', getProduct)
productRouter.post('/product', authRequired, validateSchema(productSchema), parser.single('img'), createProduct)
// productRouter.post('/upload', multerUpload.single('img'), upload)
productRouter.put('/product/:id', authRequired, cloudinaryConfig, parser.single('img'), updateProduct)
productRouter.delete('/product/:id', authRequired, deleteProduct)

export default productRouter

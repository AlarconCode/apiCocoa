import { Router } from 'express'
import { authRequired } from "../middlewares/validateToken.js";
import { 
  allowCors,
  createProduct, 
  deleteProduct, 
  getProduct, 
  getProducts, 
  updateProduct, 
} from '../controller/products.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js';
import { productSchema } from '../schemas/product.schema.js';
// import { multerUpload } from '../libs/storage.js';


const productRouter = Router()

productRouter.get('/products', getProducts)
productRouter.get('/products/:cat', getProducts)
productRouter.get('/product/:id', getProduct)
productRouter.post('/product', authRequired, validateSchema(productSchema), createProduct)
// productRouter.post('/upload', multerUpload.single('img'), upload)
productRouter.put('/product/:id', authRequired, updateProduct)
productRouter.delete('/product/:id', authRequired, deleteProduct)
productRouter.options('/product/:id', allowCors)

export default productRouter

import { uploadCloudinary } from '../libs/cloudinary.js'
import { Product } from '../model/product.model.js'

export const getProducts = async (req, res) => {
  
  if (req.params.cat) {

    try {

      const products = await Product.find({cat:req.params.cat})
      if (!products) return res.status(404).json({message: 'products not found'})
      return res.json(products)
  
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }

  }

  try {

    const products = await Product.find()
    if (!products) return res.status(404).json({message: 'products not found'})
    return res.json(products)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}

export const getProduct = async (req, res) => {
 
  try {
    
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({message: 'product not found'})
    res.json(product)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export const createProduct = async (req, res) => {
  
  try {
    // Añadido para CORS policy en Vercel https://github.com/orgs/vercel/discussions/65#discussioncomment-2668426
    if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }
    const {cat, desc, ingredientes, price} = req.body

    const newProduct = new Product({
      cat, 
      desc,
      ingredientes,
      price,
      user: req.user.id
    })

    if (req.files) {
      const {img} = req.files
      const cloudFile = await uploadCloudinary(img.tempFilePath)
      newProduct.img = cloudFile.secure_url
      console.log(cloudFile);
      const insertedProduct = await newProduct.save();
      res.status(201).json({
        message:'Product uploaded successfully',
        newProduct: insertedProduct
    })
    } else {     
      const insertedProduct = await newProduct.save();
      return res.status(201).json(insertedProduct);
    }
   

  } catch (error) {
    return res.status(500).json({ error })
  }

}

export const updateProduct = async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  try {

    if (req.files) {
      const {img} = req.files
      const cloudFile = await uploadCloudinary(img.tempFilePath)
      const product = await Product.findOneAndUpdate({_id: req.params.id}, {
        ...req.body,
        // img: `${req.protocol}://${req.headers.host}/public/${filename}`
        img: cloudFile.secure_url
      }, { new: true });
      if (!product) return res.status(404).json({message: 'product not found'})
      res.json(product)
    } else {
        const product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, { new: true });
        if (!product) return res.status(404).json({message: 'product not found'})
        res.json(product)
    }
    

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
  

}

export const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({
        error: true,
        code: 404,
        message: 'product not found'
      })
    }
    
    
    return res.status(200).json({
      error: false,
      code: 200,
      message: 'deleted successfully'
    })
  
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}

// export const upload = async (req, res) => {

//   try {
    
//     console.log(req.file); 
//     return  res.status(201).json({
//       message: 'ok',
//       file: req.file
//     })

//   } catch (error) {
//     console.log(error);
//   }

// }
 
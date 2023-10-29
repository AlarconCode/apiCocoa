import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const Schema = mongoose.Schema

let productSchema = new Schema({
  cat: {
    type: String
  },
  desc: {
    type: String
  },
  ingredientes: {
    type: String
  },
  price: {
    type: String
  },
  img: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
},{
  timestamps: true
})

productSchema.method('setImgUrl', function (filename) {
  const host = process.env.HOST
  const port = process.env.PORT
  this.img = `${host}:${port}/public/${filename}`

})

export const Product = mongoose.model('Product', productSchema)

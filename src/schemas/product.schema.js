import * as yup from 'yup'

export const productSchema = yup.object({
  id: yup.string(),
  cat: yup.string().required(),
  desc: yup.string().required(),
  ingredientes: yup.string(),
  price: yup.string().required(),
  img: yup.string()
})
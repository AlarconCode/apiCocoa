import * as yup from 'yup'

export const productSchema = yup.object().shape({
  id: yup.string(),
  cat: yup.string().required('Campo requerido'),
  desc: yup.string().required().max('Máximo 120 caracteres').required('Campo requerido'),
  ingredientes: yup.string('Máximo 120 caracteres'),
  price: yup.number('Debes introducir un numero').required('Campo requerido'),
  img: yup.string()
})
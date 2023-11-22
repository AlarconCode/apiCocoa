import * as yup from 'yup'

export const productSchema = yup.object().shape({
  _id: yup.string(),
  cat: yup.string().required('Campo requerido'),
  desc: yup.string().max(120, 'Máximo 120 caracteres').required('Campo requerido'),
  ingredientes: yup.string().max(120, 'Máximo 120 caracteres'),
  price: yup.number().typeError('Debes introducir un numero').positive().required('Campo requerido'),
});
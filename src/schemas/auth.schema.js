import * as yup from 'yup'

export const authSchema = yup.object({
  name: yup.string().required().min(3).max(32),
  email: yup.string().email().required(),
  password: yup.string()
  .min(8, 'Password must be 8 characters long')
  .matches(/[0-9]/, 'Password requires a number')
  .matches(/[a-z]/, 'Password requires a lowercase letter')
  .matches(/[A-Z]/, 'Password requires an uppercase letter')
  .matches(/[^\w]/, 'Password requires a symbol')
  .matches(/^\S*$/, 'Whitespace is not allowed')
  .required(),
})
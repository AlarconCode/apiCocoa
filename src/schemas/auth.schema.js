import * as yup from 'yup'

export const authSchema = yup.object({
  name: yup.string().required().min(3).max(32),
  surname: yup.string().min(3).max(32),
  email: yup.string().email().required(),
  password: yup.string().required().min(8,'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})
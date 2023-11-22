export const validateSchema = (schema) => async (req, res, next) => {
  console.log(req.body);
  try {
    await schema.validate(req.body, { abortEarly: false })
    console.log('registro validado en el back');
    next()

  } catch (e) {

    return res.status(400).json({ 
      error: true, 
      code: 400,
      message: e.errors 
    });
  }

}
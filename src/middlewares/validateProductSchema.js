export const validateProductSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, code: 400, message: error.errors });
  }
};
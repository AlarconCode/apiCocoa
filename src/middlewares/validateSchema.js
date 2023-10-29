export const validateSchema = (schema) => async (req, res, next) => {

  try {
    // await schema.validate(req.body)
    next()

  } catch (e) {
    console.log(e);
    return res.status(500).json({ type: e.name, message: e.message });
  }

}
const validateBody = (schema) => async (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.issues.map((err) => {
        return `${err.path}: ${err.message}`;
      }),
    });
  }
};

export { validateBody };

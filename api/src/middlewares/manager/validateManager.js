export const validateManager = (req, res, next) => {
  const { name, age, email, password, address } = req.body;

  if (!name || !age || !email || !password || !address) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (typeof age !== "number" || age < 18) {
    return res.status(400).json({ message: "Age must be a number and at least 18." });
  }


  next();
};

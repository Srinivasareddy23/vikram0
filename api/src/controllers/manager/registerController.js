import { Manager } from "../../schemas/manager/managerRegister.js";
import bcrypt from "bcrypt";

export const validateManager = (req, res, next) => {
  const { 
    firstname, 
    lastname, 
    fathername, 
    age, 
    email, 
    password, 
    role, 
    aadhar, 
    uan, 
    address 
  } = req.body;

  if (!firstname || !lastname || !fathername || !age || !email || !password || !role || !aadhar || !uan || !address) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (typeof firstname !== "string" || firstname.trim().length < 2) {
    return res.status(400).json({ message: "Firstname must be a valid string with at least 2 characters." });
  }

  if (typeof lastname !== "string" || lastname.trim().length < 2) {
    return res.status(400).json({ message: "Lastname must be a valid string with at least 2 characters." });
  }

  if (typeof fathername !== "string" || fathername.trim().length < 2) {
    return res.status(400).json({ message: "Fathername must be a valid string with at least 2 characters." });
  }

  if (typeof age !== "number" || age < 18 || age > 100) {
    return res.status(400).json({ message: "Age must be a number between 18 and 100." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  if (typeof role !== "string" || role.trim() === "") {
    return res.status(400).json({ message: "Role is required and must be a valid string." });
  }

  const aadharRegex = /^\d{12}$/;
  if (!aadharRegex.test(aadhar)) {
    return res.status(400).json({ message: "Aadhar must be a 12-digit number." });
  }

  const uanRegex = /^\d{12}$/;
  if (!uanRegex.test(uan)) {
    return res.status(400).json({ message: "UAN must be a 12-digit number." });
  }

  if (typeof address !== "string" || address.trim().length < 5) {
    return res.status(400).json({ message: "Address must be a valid string with at least 5 characters." });
  }

  next();
};

export const registerController = async (req, res) => {
  try {
    const { firstname, lastname, fathername, age, email, password, role, aadhar, uan, address } = req.body;

    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const manager = new Manager({
      firstname,
      lastname,
      fathername,
      age,
      email,
      password: hashedPassword,
      role,
      aadhar,
      uan,
      address,
    });

    await manager.save();

    res.status(201).json({ message: "Manager registered successfully." });
  } catch (error) {
    console.error("Error saving manager:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};

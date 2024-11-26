import { Manager } from "../../schemas/manager/managerRegister.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    const { name, age, email, password, address } = req.body;

    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const manager = new Manager({
      name,
      age,
      email,
      password: hashedPassword,
      address,
    });

    await manager.save();

    res.status(201).json({ message: "Manager registered successfully." });
  } catch (error) {
    console.error("Error saving manager:", error);
    res.status(500).json({ message: "Internal server error.", error });
  }
};

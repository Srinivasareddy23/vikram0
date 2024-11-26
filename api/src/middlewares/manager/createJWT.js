import { Manager } from "../../schemas/manager/managerRegister.js";
import Error from "../../utils/error/error.js";
import bcrypt from "bcrypt";

const CreateJWT = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(Error(400, "Please fill all fields"));
    }

    const manager = await Manager.findOne({ email });

    if (!manager) {
      return res.status(404).json(Error(404, "Manager not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, manager.password);

    if (!isPasswordValid) {
      return res.status(401).json(Error(401, "Invalid credentials"));
    }

    req.manager = manager;

    next();
  } catch (error) {
    return res.status(500).json(Error(500, "Internal Server Error"));
  }
};

export default CreateJWT;

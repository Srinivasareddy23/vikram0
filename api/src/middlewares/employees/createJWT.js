import { Employee } from "../../schemas/employees/employeeRegister.js";
import Error from "../../utils/error/error.js";
import bcrypt from "bcrypt";

const CreateJWT = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(Error(400, "Please fill all fields"));
    }

    const teamlead = await Employee.findOne({ email, role: "teamlead" });

    if (!teamlead) {
      return res.status(404).json(Error(404, "Team Lead not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, teamlead.password);

    if (!isPasswordValid) {
      return res.status(401).json(Error(401, "Invalid credentials"));
    }

    req.teamlead = teamlead;

    next();
  } catch (error) {
    return res.status(500).json(Error(500, "Internal Server Error"));
  }
};

export default CreateJWT;

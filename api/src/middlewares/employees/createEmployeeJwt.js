import { Employee } from "../../schemas/employees/employeeRegister.js";
import Error from "../../utils/error/error.js";
import bcrypt from "bcrypt";

const EmployeeCreateJWT = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json(Error(400, "Please fill all fields"));
    }

    const employee = await Employee.findOne({ email, role: "employee" });

    if (!employee) {
      return res.status(404).json(Error(404, "Employee not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      return res.status(401).json(Error(401, "Invalid credentials"));
    }

    req.employee = employee;

    next();
  } catch (error) {
    return res.status(500).json(Error(500, "Internal Server Error"));
  }
};

export default EmployeeCreateJWT;

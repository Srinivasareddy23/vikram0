import jwt from "jsonwebtoken";

const EmployeeloginController = (req, res) => {
  const employee = req.employee;

  if (!employee) {
    return res.status(404).json({ success: false, message: "Employee not found" });
  }

  const token = jwt.sign(
    { id: employee._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const employeeData = {
    id: employee._id,
    firstname: employee.firstname,
    email: employee.email,
    role: employee.role,
  };

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    employeeData,
  });
};

export default EmployeeloginController;

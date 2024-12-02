const EmployeelogoutController = (req, res) => {
  const token = req.cookies.token; 

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "No token found to logout",
    });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

export default EmployeelogoutController;

import jwt from "jsonwebtoken";

const loginController = (req, res) => {
  const teamlead = req.teamlead;

  if (!teamlead) {
    return res.status(404).json({ success: false, message: "Team Lead not found" });
  }

  const token = jwt.sign(
    { id: teamlead._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const teamLeadData = {
    id: teamlead._id,
    firstname: teamlead.firstname,
    email: teamlead.email,
    role: teamlead.role,
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
    teamLeadData,
  });
};

export default loginController;

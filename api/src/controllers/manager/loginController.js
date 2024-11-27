import jwt from 'jsonwebtoken';

const loginController = (req, res) => {
  const manager = req.manager;

  if (!manager) {
    return res.status(404).json({ success: false, message: "Manager not found" });
  }

  const token = jwt.sign(
    { id: manager._id},
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const managerData = {
    id : manager._id,
    firstname : manager.firstname,
    email : manager.email,
    role : manager.role
  }

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({ 
    success: true, 
    message: "Login successful", 
    managerData
  });
};

export default loginController;

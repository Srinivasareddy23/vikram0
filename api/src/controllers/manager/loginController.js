import jwt from 'jsonwebtoken';

const loginController = (req, res) => {
  const manager = req.manager;
  console.log("Manager Data:", manager);

  if (!manager) {
    return res.status(404).json({
      success: false,
      message: "Manager not found",
      data: null,
    });
  }

  const payload = {
    id: manager._id,
    name: manager.name,
    email: manager.email,
    address: manager.address || "Unknown",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      token, 
      manager: {
        id: manager._id,
        name: manager.name,
        email: manager.email,
        address: manager.address || "Unknown",
      },
    },
  });
};

export default loginController;

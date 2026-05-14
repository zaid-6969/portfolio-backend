import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = {
      _id: "507f1f77bcf86cd799439011",
      username: "Zaid",
      email: "zaid@gmail.com",
      password: "zaid1234",
    };

    if (email === admin.email && password === admin.password) {
      res.status(200).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    console.log(req.body);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

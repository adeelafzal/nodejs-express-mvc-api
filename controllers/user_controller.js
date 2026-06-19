const User = require("../models/user_model");
const {getJWT} = require("../services/auth_service")

async function getAllUsers(req, res) {
  const users = await User.find();
  return res.json(users);
}

async function getUserDetails(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
}

async function updateUser(req, res) {
  const updateduser = await User.findByIdAndUpdate(req.params.id, req.body);
  return res.json({ message: "User updated successfully" });
}

async function deleteUser(req, res) {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.json({ message: "User does't exist" });
  return res.json({ message: "User deleted successfully" });
}

async function createUser(req, res) {
  const body = req.body;
  if (!body || !body.firstName || !body.email || !body.password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const user = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
    password: body.password
  });
  return res.status(201).json({ message: "User created successfully" });
}

async function signIn(req, res) {
  const body = req.body;
  if(!body || !body.email || !body.password){
    return res.json({message: "All fields are required"});
  }
  const {email, password} = req.body;
  const user = await User.findOne({email, password});
  if(!user) return res.json({message: "Invalid email or passowrd"});
  const jwtToken = getJWT(user);
  return res.json({jwt:jwtToken,data:user});
}

module.exports = {
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  createUser,
  signIn
};

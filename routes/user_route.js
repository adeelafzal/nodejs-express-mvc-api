const express = require("express");
const authenticate = require("../middlewares/auth_middleware");
const {
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  createUser,
  signIn,
} = require("../controllers/user_controller");

const router = express.Router();

router.route("/").get(authenticate, getAllUsers).post(createUser);

router.post("/auth", signIn);

router
  .route("/:id")
  .get(authenticate, getUserDetails)
  .patch(authenticate, updateUser)
  .delete(authenticate, deleteUser);

module.exports = router;

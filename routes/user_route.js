const express = require("express");
const {
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  createUser,
} = require("../controllers/user_controller");

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserDetails).patch(updateUser).delete(deleteUser);

module.exports = router;

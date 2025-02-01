const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

const {authenticateUser} = require("../middleware/authUser");
const { roleCheck } = require("../middleware/roleCheck");



userRouter.get('/', authenticateUser,roleCheck('admin'),userController.getNurses);

userRouter.post('/nurse', roleCheck('admin'), userController.createUser);


userRouter.get('/:id', authenticateUser, userController.getUserById);

userRouter.put('/:id', authenticateUser, roleCheck('admin'), userController.updateUser);

userRouter.delete('/:id', authenticateUser, roleCheck('admin'), userController.deleteUser);

module.exports = userRouter;

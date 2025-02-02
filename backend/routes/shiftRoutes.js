
const express = require("express");
const shiftRouter = express.Router();
const shiftController = require("../controllers/shiftController");
const {authenticateUser} = require("../middleware/authUser");
const isLoggedIn = require("../middleware/isLoggedIn");


shiftRouter.get("/", authenticateUser, shiftController.getShifts);

shiftRouter.post("/start", authenticateUser, shiftController.startShift);

shiftRouter.put("/end", authenticateUser, shiftController.endShift);


module.exports = shiftRouter;

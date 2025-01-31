
const express = require("express");
const shiftRouter = express.Router();
const ShiftController = require("../controllers/shiftController");
const {authenticateUser} = require("../middleware/authUser");
const isLoggedIn = require("../middleware/isLoggedIn");



shiftRouter.post("/start", authenticateUser, ShiftController.startShift);

shiftRouter.post("/end", authenticateUser, ShiftController.endShift);

shiftRouter.get("/", authenticateUser, ShiftController.getShifts);

module.exports = shiftRouter;

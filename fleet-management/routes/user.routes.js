console.log("User route file loaded");
const express = require("express");
const router = express.Router();


const userController = require("../controllers/user.controller");
console.log("User controller loaded:", userController);

router.get("/test", (req, res) => {
  res.send("User route working");
});


router.post("/signup", userController.signup);

module.exports = router;

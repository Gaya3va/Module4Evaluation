const express = require("express");
const router = express.Router();

const controller = require("../controllers/trip.controller");

router.post("/create", controller.createTrip);
router.patch("/update/:tripId", controller.updateTrip);
router.get("/:tripId", controller.getTrip);
router.delete("/delete/:tripId", controller.deleteTrip);
router.patch("/end/:tripId", controller.endTrip);

module.exports = router;

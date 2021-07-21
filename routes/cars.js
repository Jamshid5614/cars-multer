const express = require("express");
const router = express.Router();
const {
  createCar,
  getCar,
  deleteCar,
  updateCar,
  getCarForView,
  getAllCars,
} = require("../controllers/cars");
const auth = require("../middleware/auth");
const upload = require("../utils/multer");

router.get("/", getAllCars);
router.get("/:id", getCar);
router.patch("/:id", upload.single("image"), updateCar);
router.delete("/:id", deleteCar);
router.post("/new", upload.single("image"), createCar);
router.get("cars/view/:id", getCarForView);

module.exports = router;


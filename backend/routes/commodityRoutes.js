const express = require("express");
const {
  addCommodity,
  getCommodities,
  getCommoditiesByFarmer,
  updateCommodity,
  deleteCommodity,
} = require("../controllers/commodityController");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/add", auth, upload.array("images", 10), addCommodity);
router.get("/", getCommodities);
router.get("/farmer", auth, getCommoditiesByFarmer);
router.put("/update/:id", auth, upload.array("images", 10), updateCommodity);
router.delete("/delete/:id", auth, deleteCommodity);

module.exports = router;

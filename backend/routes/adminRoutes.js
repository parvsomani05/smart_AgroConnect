const express = require("express");
const {
  getUsers,
  getCommodities,
  getBids,
} = require("../controllers/adminController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", auth, getUsers);
router.get("/commodities", auth, getCommodities);
router.get("/bids", auth, getBids);

module.exports = router;

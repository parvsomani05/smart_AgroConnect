const express = require("express");
const { placeBid, getBids } = require("../controllers/bidController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/place", auth, placeBid);
router.get("/", auth, getBids);

module.exports = router;

const mongoose = require("mongoose");

const commoditySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  price: { type: Number, required: true },
  location: { type: String, required: true },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
});

const Commodity = mongoose.model("Commodity", commoditySchema);

module.exports = Commodity;

const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  commodity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commodity",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
});

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;

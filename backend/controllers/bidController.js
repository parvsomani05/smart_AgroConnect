const Bid = require("../models/bidModel");
const Commodity = require("../models/commodityModel");

const placeBid = async (req, res) => {
  const { amount, commodityId } = req.body;
  const buyer = req.user.id;

  try {
    const newBid = new Bid({ amount, buyer, commodity: commodityId });
    await newBid.save();

    const commodity = await Commodity.findById(commodityId);
    commodity.bids.push(newBid._id);
    await commodity.save();

    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getBids = async (req, res) => {
  try {
    const bids = await Bid.find({ buyer: req.user.id }).populate(
      "commodity",
      "name"
    );
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { placeBid, getBids };

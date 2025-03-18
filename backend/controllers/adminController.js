const User = require("../models/userModel");
const Commodity = require("../models/commodityModel");
const Bid = require("../models/bidModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCommodities = async (req, res) => {
  try {
    const commodities = await Commodity.find().populate("farmer", "name");
    res.status(200).json(commodities);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getBids = async (req, res) => {
  try {
    const bids = await Bid.find()
      .populate("commodity", "name")
      .populate("buyer", "name");
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getUsers, getCommodities, getBids };

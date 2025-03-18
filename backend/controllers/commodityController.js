const Commodity = require("../models/commodityModel");

const addCommodity = async (req, res) => {
  const { name, description, price, location } = req.body;
  const farmer = req.user.id;
  const images = req.files.map((file) => file.path);

  try {
    const newCommodity = new Commodity({
      name,
      description,
      images,
      price,
      location,
      farmer,
    });
    await newCommodity.save();
    res.status(201).json(newCommodity);
  } catch (error) {
    console.error("Error adding commodity:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCommodities = async (req, res) => {
  try {
    const commodities = await Commodity.find().populate("farmer", "name");
    res.status(200).json(commodities);
  } catch (error) {
    console.error("Error fetching commodities:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCommoditiesByFarmer = async (req, res) => {
  try {
    const commodities = await Commodity.find({ farmer: req.user.id });
    res.status(200).json(commodities);
  } catch (error) {
    console.error("Error fetching commodities by farmer:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateCommodity = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, location } = req.body;
  const images = req.files.map((file) => file.path);

  try {
    const updatedCommodity = await Commodity.findByIdAndUpdate(
      id,
      { name, description, images, price, location },
      { new: true }
    );
    res.status(200).json(updatedCommodity);
  } catch (error) {
    console.error("Error updating commodity:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteCommodity = async (req, res) => {
  const { id } = req.params;

  try {
    await Commodity.findByIdAndDelete(id);
    res.status(200).json({ message: "Commodity deleted successfully" });
  } catch (error) {
    console.error("Error deleting commodity:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addCommodity,
  getCommodities,
  getCommoditiesByFarmer,
  updateCommodity,
  deleteCommodity,
};

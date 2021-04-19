const WilderModel = require("../models/Wilder");
const getById = async (req, res) => {
  const { _id } = req.body._id ? req.body : req.params;
  const wilderFound = await WilderModel.findOne({ _id: _id });
  if (!wilderFound) {
    res.json({ success: false, result: "No wilder found" });
  }
  res.status(200).json({ success: true, result: { ...wilderFound[0] } });
};
module.exports = {
  create: async (req, res) => {
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.status(201).json({ success: true, result: result });
  },
  getById: async (req, res) => {
    await getById(req, res);
  },
  // getBySkills: async(req, res)=>{
  //     const {skill}= req.params
  // },
  retrieve: async (req, res) => {
    const wildersFound = await WilderModel.find();
    if (!wildersFound) {
      res.json({ success: false, result: "No wilder found" });
    }
    res.status(200).json({ success: true, result: wildersFound });
  },
  delete: async (req, res) => {
    const { _id } = req.params;
    const wilderDeleted = await WilderModel.deleteOne({ _id: _id });
    if (wilderDeleted.deletedCount === 0) {
      res.json({ success: false, result: "No wilder found" });
    }
    res.status(204).json({ success: true, result: wilderDeleted });
  },
  update: async (req, res) => {
    const { _id } = req.body;
    const result = await WilderModel.updateOne({ _id }, req.body);
    if (result.n === 0) {
      res.status(404).json({ success: false, result: "No wilder found" });
    } else {
      await getById(req, res);
    }
    res.status(200).json({ success: true, result: result });
  },
};

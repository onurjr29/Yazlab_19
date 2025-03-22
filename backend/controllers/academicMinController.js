const express = require("express");
const AcademicPosition = require("../models/AcademicPosition");

const router = express.Router();

exports.getPositions = (async (req, res) => {
  try {
    const positions = await AcademicPosition.find();
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ message: "Hata oluştu", error });
  }
});

exports.getPositionsById = (async (req, res) => {
  try {
    const {id} = req.params;
    const position = await AcademicPosition.findById(id);
    res.status(200).json(position);
  } catch (error) {
    res.status(500).json({ message: "Hata oluştu", error });
  }
});


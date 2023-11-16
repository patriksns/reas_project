const express = require("express");
const saveForm = express.Router();
const Form = require("../../models/Form");

saveForm.post("/lead", async (req, res) => {
  const { FullName, Phone, EstateType, Email, Region, District } = req.body;

  try {
    const form = new Form({
      FullName: FullName,
      Phone: Phone,
      EstateType: EstateType,
      Email: Email,
      Region: Region,
      District: District,
    });

    const savedForm = await form.save();

    res.json({
      msg: `Formulář uložen: ${JSON.stringify(savedForm)}`,
    });
  } catch (error) {
    console.error("Error při ukládání formuláře:", error);
    res.status(500).json({
      msg: "Error 500",
    });
  }
});

module.exports = saveForm;

const express = require("express");
const getForms = express.Router();
const Form = require("../../models/Form");

getForms.get("/get-forms", async (req, res) => {
    try {
        const docs = await Form.find({});
        return res.json({
            msg: "Úspěšně se načetla data",
            documents: docs
        });
    } catch (err) {
        return res.json({
            msg: "Nepodařilo se získat žádné data",
            documents: []
        });
    }
});

module.exports = getForms;

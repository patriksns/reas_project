const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const saveForm = require("./routes/POST/SaveForm");
const getForms = require("./routes/GET/GetForms");
const DB = require("./database/connect");
const cors = require("cors");

DB.connect();

/**
 * Enabling GET/POST data structures for Express
 * (např. pomáhá přijímat JSON z FE)
 */

app.use(express.json({extended: false}));
app.use(express.text({extended: false}));

/**
 * Routy - POST
 */

app.use(cors());
app.use("/",saveForm);

/**
 * Routy - GET
 */

app.use("/",cors(),getForms);

app.get("/", (request,response) => {
    response.send("Toto je BE");
});

app.listen(PORT, (err) => {
    console.log(`Server běží na ${PORT}!`)
});
const mongoose = require("mongoose");
const dotenv = require("dotenv");

class dbConnect {
    async connect() {
    try {
        dotenv.config();
        mongoose.set('strictQuery', false);
      
    await mongoose.connect(process.env.DBCONNECT);

      console.log("Připojeno úspěšně k DB!");
    }
    
    catch (err) {
      console.error("Chyba při připojování k databázi:", err.message);
      process.exit(1);
    }
  }
}

module.exports = new dbConnect();

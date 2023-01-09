const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set('strictQuery', false);
async function connect() {
  try {
    await mongoose.connect(
      process.env.DB_ACCESS,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('Connect Successfully !!!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };

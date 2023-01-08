const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://iot:iot@iot.oyv2rib.mongodb.net/IOT',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('Connect Successfully !!!');
  } catch (error) {
    console.log("Connect fail");
  }
}

module.exports = { connect };

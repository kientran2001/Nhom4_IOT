var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const http = require('http');
const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://broker.hivemq.com:1883")
const Device = require('./models/device/device.model')
const Home = require('./models/home/home.model')
const supervisorService = require('./modules/supervisor/supervisor.service')
var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;;

client.on("connect", async function () {
    client.subscribe("/ktmt/out", function (err) {

        if (err) {
            console.log("subscribed error");
        } else console.log("Server has subscribed successfully");
    });
    const devices = await Device.find()
    devices.map((device) => {
        client.publish("/ktmt/in", JSON.stringify(device), function (err) {
            if (err) {
                console.log("published error");
            } else console.log("Server has published successfully");
        });
    })

});

client.on("message", (topic, message) => {
    try {
        
        // console.log(1);
        const obj = JSON.parse(message.toString());
        obj.updatedAt = new Date();
        // console.log("objID: ", obj._id, typeof obj._id)
        // console.log("obj: ", obj)
        const ID = obj._id.split('"');
        console.log("ID: ", ID[1]);
        obj._id = ID[1];


        console.log("obj: ", obj)
        Device.findById(obj._id)
            .then((data) => {
                if (data) {
                    console.log(data);
                    // const re = /"(.*?)"/g;
                    // var matches = data.homeId.matches(re);
                    // console.log( matches[1]);
                    var supData = {
                        'homeId': mongoose.Types.ObjectId(String(data.homeId)),
                        'temperature':  obj.temperature,
                        'humidity': obj.humidity
                    }
                    supervisorService.createSupervisor(supData);
                } else {
                    console.log("device khong ton tai");
                }
            })
            .catch((err) => {
                console.log("connect db error");
            });
    } catch (err) {
        console.log("error: ", err.message);
    }
})

// import de su dung process.env va bien global
require('dotenv').config();
const db = require('./connection/index');
db.initDbConnection()

// khai bao cac route
const user = require('./modules/user/user.route');
const auth = require('./modules/auth/auth.route');
const home = require('./modules/home/home.route');
const device = require('./modules/device/device.route');
const sensor = require('./modules/sensor/sensor.route');
const supervisor = require('./modules/supervisor/supervisor.route');

var app = express();

app.use(cors());

app.use(

    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());


app.use("/user", user);
app.use("/auth", auth);
app.use("/home", home);
app.use("/device", device);
app.use("/sensor", sensor);
app.use("/supervisor", supervisor);

const port = 8080;
app.get('/a', (req, res) => {
    return res.send('d')
})

const ip = require('ip');
ipAddress = ip.address();
console.log(ipAddress);
app.listen(port, () => {
    console.log("Server is running at localhost:" + port);
});
// -----------------------START SERVER SUCCESSFULLY---------------------------

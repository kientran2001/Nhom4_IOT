const Sensor = require('../../models/sensor/sensor.model')

const Home = require('../../models/home/home.model')

exports.createSensor = async (data) => {

    //Them nha vao db
    let newSensor = await Sensor.create({ ...data });
    let sensor = await Sensor.findById({ _id: newSensor._id });
    let homeInfo = await Home.findById(data.homeId);
    //Them vao danh sach Sensor cua nguoi dang
    if (homeInfo) {
        homeInfo.sensors.push(newSensor._id);
        await homeInfo.save();
    }


    return { sensor }
}

exports.deleteSensor = async (sensorId, homeId) => {

    let sensorSelect = await Sensor.findById(sensorId);
    let home = await Home.findById(homeId);

    let sensor = await Sensor.findByIdAndDelete(sensorId);
    //Loại bỏ Sensor khỏi Home

    let sensors = [...home.sensors || []];
    home.sensors = sensors.filter(p => p.toString() !== sensorId);
    await home.save();

    return { sensor }
}

exports.getSensorForUpdate = async (sensorId, homeId) => {


    let home = await Home.findById(homeId);

    if (!home) {
        throw Error("home is not existing")
    }

    //Check Sensor đó có phải của Home này hay k
    let isSensorOfHome = home.sensors.includes(sensorId);

    if (!isSensorOfHome) {
        throw Error("you_can_not_access")
    }

    let sensor = await Sensor
        .findById(sensorId)

    if (!sensor) {
        throw Error("Sensor is not existing")
    }
    return { sensor }
}

exports.updateSensor = async (id, data) => {

    if (!data.name) {
        data.name = undefined;
    }
    if (!data.value) {
        data.value = undefined;
    }
    let sensor = await Sensor.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { sensor }
}
exports.getDetailSensor = async (id) => {


    let sensor = await Sensor
        .findById(id)
        .populate([

            {
                path: "homeId"
            }
        ])

    if (!sensor) {
        throw Error("Sensor is not existing")
    }
    return { sensor }
}


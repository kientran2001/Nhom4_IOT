const Device = require('../../models/device/device.model')

const Home = require('../../models/home/home.model')

exports.createDevice = async (data) => {

    //Them nha vao db
    let newDevice = await Device.create({ ...data });
    let device = await Device.findById({ _id: newDevice._id });
    let homeInfo = await Home.findById(data.homeId);
    //Them vao danh sach Device cua nguoi dang
    if (homeInfo) {
        homeInfo.devices.push(newDevice._id);
        await homeInfo.save();
    }


    return { device }
}

exports.deleteDevice = async (deviceId, homeId) => {

    let deviceSelect = await Device.findById(deviceId);
    let home = await Home.findById(homeId);

    let device = await Device.findByIdAndDelete(deviceId);
    //Loại bỏ Device khỏi Home

    let devices = [...home.devices || []];
    home.devices = devices.filter(p => p.toString() !== deviceId);
    await home.save();

    return { device }
}

exports.getDeviceForUpdate = async (deviceId, homeId) => {


    let home = await Home.findById(homeId);

    if (!home) {
        throw Error("home is not existing")
    }

    //Check Device đó có phải của Home này hay k
    let isDeviceOfHome = home.devices.includes(deviceId);

    if (!isDeviceOfHome) {
        throw Error("you_can_not_access")
    }

    let device = await Device
        .findById(deviceId)

    if (!device) {
        throw Error("Device is not existing")
    }
    return { device }
}

exports.updateDevice = async (id, data) => {

    if (!data.name) {
        data.name = undefined;
    }
    if (!data.state) {
        data.state = undefined;
    }
    let device = await Device.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { device }
}
exports.getDetailDevice = async (id) => {


    let device = await Device
        .findById(id)
        .populate([

            {
                path: "homeId"
            }
        ])

    if (!device) {
        throw Error("device is not existing")
    }
    return { device }
}


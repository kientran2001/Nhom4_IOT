const deviceService = require('./device.service');

const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://broker.hivemq.com:1883")

exports.createNewDevice = async (req, res) => {
    try {
        let data = req.body;
        let newDevice = await deviceService.createDevice(data);

        res.status(201).json({
            success: true,
            messages: ["Tạo thiết bị thành công!"],
            content: newDevice
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Thiết bị chưa được thêm!"],
            content: error.message
        });
    }
}

exports.getDetailDevice = async ( req, res ) => {
    try {
        let id = req.params.id;
        let device = await deviceService.getDetailDevice(id)
        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu thiết bị thành công"],
            content: device
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu thiết bị không thành công"],
            content: error.message
        });
    }
}

exports.getDeviceForUpdate = async ( req, res ) => {
    try {
        let id = req.params.id;
        let device = await deviceService.getDeviceForUpdate( id, req.user._id)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu thiết bị thành công"],
            content: device
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: error.message === "you_can_not_access" ?
            ["Bạn không có quyền truy cập!"] :
            ["Lấy dữ liệu thiết bị không thành công"],
            content: error.message
        });
    }
}

exports.updateDevice = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        if(data.status) {
            client.publish("/ktmt/in", "on", function (err) {
                if (err) {
                    console.log("published error");
                } else console.log("Server has published successfully");
            });
        } else {
            client.publish("/ktmt/in", "off", function (err) {
                if (err) {
                    console.log("published error");
                } else console.log("Server has published successfully");
            });
        }
        
        let device = await deviceService.updateDevice( id, data)

        res.status(200).json({
            success: true,
            messages: ["Cập nhật thiết bị thành công"],
            content: device
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Cập nhật thiết bị không thành công"],
            content: error.message
        });
    }
}

exports.deleteDevice = async ( req, res ) => {
    try {
        let deviceId = req.params.id;
        let homeId = req.params.homeId;

        let device = await deviceService.deleteDevice( deviceId, homeId)

        res.status(200).json({
            success: true,
            messages: ["Xóa thiết bị thành công"],
            content: device
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Xóa thiết bị không thành công"],
            content: error.message
        });
    }
}


const sensorService = require('./sensor.service');

exports.createNewSensor = async (req, res) => {
    try {
        let data = req.body;
        let newSensor = await sensorService.createSensor(data);

        res.status(201).json({
            success: true,
            messages: ["Tạo cảm biến thành công!"],
            content: newSensor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["cảm biến chưa được thêm!"],
            content: error.message
        });
    }
}

exports.getDetailSensor = async ( req, res ) => {
    try {
        let id = req.params.id;
        let sensor = await sensorService.getDetailSensor(id)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu cảm biến thành công"],
            content: sensor
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu cảm biến không thành công"],
            content: error.message
        });
    }
}

exports.getSensorForUpdate = async ( req, res ) => {
    try {
        let id = req.params.id;
        let sensor = await sensorService.getSensorForUpdate( id, req.user._id)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu cảm biến thành công"],
            content: sensor
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: error.message === "you_can_not_access" ?
            ["Bạn không có quyền truy cập!"] :
            ["Lấy dữ liệu cảm biến không thành công"],
            content: error.message
        });
    }
}

exports.updateSensor = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let sensor = await sensorService.updateSensor( id, data)

        res.status(200).json({
            success: true,
            messages: ["Cập nhật cảm biến thành công"],
            content: sensor
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Cập nhật cảm biến không thành công"],
            content: error.message
        });
    }
}

exports.deleteSensor = async ( req, res ) => {
    try {
        let sensorId = req.params.id;
        let sensor = await sensorService.deleteSensor( sensorId, req.home._id)

        res.status(200).json({
            success: true,
            messages: ["Xóa cảm biến thành công"],
            content: sensor
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Xóa cảm biến không thành công"],
            content: error.message
        });
    }
}


const homeService = require('./home.service');

exports.createNewHome = async (req, res) => {
    try {
        let data = req.body;
        let newHome = await homeService.createHome(data);

        res.status(201).json({
            success: true,
            messages: ["Tạo nhà thành công!"],
            content: newHome
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Nhà chưa được thêm!"],
            content: error.message
        });
    }
}
exports.getAllHome = async (req, res) => {
    try {
        let query = req.query;
        let allHomes = await homeService.getAllHomes(query);


        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách nhà thành công!"],
            content: allHomes
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách nhà không thành công!"],
            content: error.message
        });
    }
}
exports.getDetailHome = async ( req, res ) => {
    try {
        let id = req.params.id;
        let home = await homeService.getDetailHome(id)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu nhà thành công"],
            content: home
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu nhà không thành công"],
            content: error.message
        });
    }
}

exports.getHomeForUpdate = async ( req, res ) => {
    try {
        let id = req.params.id;
        let home = await homeService.getHomeForUpdate( id, req.user._id)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu nhà thành công"],
            content: home
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: error.message === "you_can_not_access" ?
            ["Bạn không có quyền truy cập!"] :
            ["Lấy dữ liệu nhà không thành công"],
            content: error.message
        });
    }
}

exports.updateHome = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let home = await homeService.updateHome( id, data)

        res.status(200).json({
            success: true,
            messages: ["Cập nhật nhà thành công"],
            content: home
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Cập nhật nhà không thành công"],
            content: error.message
        });
    }
}

exports.deleteHome = async ( req, res ) => {
    try {
        let userId = req.params.userId;
        let homeId = req.params.id;
        let home = await homeService.deleteHome( homeId, userId)

        res.status(200).json({
            success: true,
            messages: ["Xóa nhà thành công"],
            content: home
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Xóa nhà không thành công"],
            content: error.message
        });
    }
}

exports.getDevicesOfHome = async (req, res) => {
    try {
        let id = req.params.id;
        let query = req.query;
        let devices = await homeService.getDevicesOfHome(id, query);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách thiết bị trong nhà thành công!"],
            content: devices
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Các thiết bị trong nhà của bạn chưa được lấy"],
            content: error.message
        });
    }
}

exports.getSensorsOfHome = async (req, res) => {
    try {
        let id = req.params.id;
        let query = req.query;
        let sensors = await homeService.getSensorsOfHome(id, query);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách cảm biến trong nhà thành công!"],
            content: sensors
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Các cảm biến trong nhà của bạn chưa được lấy"],
            content: error.message
        });
    }
}
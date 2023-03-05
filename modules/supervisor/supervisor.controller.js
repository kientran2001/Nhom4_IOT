const supervisorService = require('./supervisor.service');


exports.createNewsupervisor = async (req, res) => {
    try {
        let data = req.body;
        let newSupervisor = await supervisorService.createSupervisor(data);

        res.status(201).json({
            success: true,
            messages: ["Tạo thiết bị thành công!"],
            content: newSupervisor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ["Thiết bị chưa được thêm!"],
            content: error.message
        });
    }
}

exports.getSupervisorDetail = async (req, res) => {
    try {
        let id = req.params.id;
        let supervisor = await supervisorService.getSupervisorDetail(id)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu cảm biến thành công"],
            content: supervisor
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu cảm biến không thành công"],
            content: error.message
        });
    }
}

exports.getAllSupervisors = async (req, res) => {
    try {
        let homeId = req.params.homeId;
        let supervisors = await supervisorService.getAllSupervisors(homeId)

        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu cảm biến thành công"],
            content: supervisors
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu cảm biến không thành công"],
            content: error.message
        });
    }
}

exports.getFiveRecentSupervisors = async (req, res) => {
    try {
        let homeId = req.params.homeId;
        let supervisors = await supervisorService.getFiveRecentSupervisors(homeId)
        let msg = supervisors.supervisors
        res.status(200).json({
            /* success: true,
            messages: ["Lấy dữ liệu cảm biến thành công"], */
            msg
        });
    } catch (error) {

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu cảm biến không thành công"],
            content: error.message
        });
    }
}

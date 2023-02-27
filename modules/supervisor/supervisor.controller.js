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

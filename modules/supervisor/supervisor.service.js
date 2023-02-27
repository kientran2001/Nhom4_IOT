const supervisor = require('../../models/supervisor/supervisor.model')

exports.createSupervisor = async (data) => {
    let newSupervisor = await supervisor.create({ ...data });
    console.log(data)
    newSupervisor.save();
    return { supervisor }
}
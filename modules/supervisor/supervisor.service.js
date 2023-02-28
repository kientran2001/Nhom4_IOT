const supervisor = require('../../models/supervisor/supervisor.model')

exports.createSupervisor = async (data) => {
    let newSupervisor = await supervisor.create({ ...data });
    console.log(data)
    newSupervisor.save();
    return { supervisor }
}

exports.getSupervisorDetail = async (id) => {


    let supervisor = await Supervisor
        .findById(id)

    if (!supervisor) {
        throw Error("Supervisor is not existing")
    }
    return { supervisor }
}

exports.getAllSupervisors = async () => {
    let supervisors = await Supervisor
        .find({})

    if(!supervisors) {
        throw Error("Supervisor is not existing")
    }
    return { supervisors}
}

exports.getFiveRecentSupervisors = async () => {
    let supervisors = await Supervisor
        .find({})
        .sort({ updatedAt: -1 })
        .limit(5)

    if(!supervisors) {
        throw Error("Supervisor is not existing")
    }
    return { supervisors}
}
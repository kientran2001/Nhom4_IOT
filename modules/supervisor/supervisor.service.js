const supervisor = require('../../models/supervisor/supervisor.model')

exports.createSupervisor = async (data) => {
    let newSupervisor = await supervisor.create({ ...data });
    console.log(data)
    newSupervisor.save();
    return { supervisor }
}

exports.getSupervisorDetail = async (id) => {


    let supervisor = await supervisor
        .findById(id)

    if (!supervisor) {
        throw Error("Supervisor is not existing")
    }
    return { supervisor }
}

exports.getAllSupervisors = async (homeId) => {
    let supervisors = await supervisor
        .find({ homeId: homeId })

    if(!supervisors) {
        throw Error("Supervisor is not existing")
    }
    return { supervisors }
}

exports.getFiveRecentSupervisors = async (homeId) => {
    let supervisors = await supervisor
        .find({ homeId: homeId })
        .sort({ updatedAt: -1 })
        .limit(5)

    if(!supervisors) {
        throw Error("Supervisor is not existing")
    }
    return { supervisors }
}
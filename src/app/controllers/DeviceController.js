const Device = require('../model/Device')

class DeviceController {
    show(req, res, next) {
        Device.find({})
            .then(devices => res.json(devices))
            .catch(next)
    }

    create(req, res, next) {
        const device = new Device(req.body)
        device.save()
            .then(devices => res.json(devices))
            .catch(error => {
                
            })
    }

    update(req, res, next) {
        Device.updateOne({ _id: req.params.id }, req.body)
            .then(res.status(200).json("Updated successfully!"))
            .catch(next)
    }
    
    delete(req, res, next) {
        Device.deleteOne({ _id: req.params.id })
            .then(devices => {
                res.status(200).json("Deleted successfully") 
            })
            .catch(next)
    }
}

module.exports = new DeviceController()

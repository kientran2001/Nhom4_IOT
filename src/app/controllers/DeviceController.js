const Device = require('../model/Device')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class DeviceController {
    show(req, res, next) {
        Device.find({})
            .then(devices => res.render('/devices', {
                devices: multipleMongooseToObject(devices)
            }))
            .catch(next)
    }

    create(req, res, next) {
        const device = new Device(req.body)
        device.save()
            .then(() => res.redirect('/devices/create'))
            .catch(error => {
                
            })
    }

    update(req, res, next) {
        Device.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/devices/create'))
            .catch(next)
    }
    
    delete(req, res, next) {
        Device.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new DeviceController()

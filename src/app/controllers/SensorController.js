const Sensor = require('../model/Sensor')
const { multipleMongooseToObject } = require('../../utils/mongoose')

class SensorController {
    show(req, res, next) {
        Sensor.find({})
            .then(sensors => res.render('/sensors', {
                sensors: multipleMongooseToObject(sensors)
            }))
            .catch(next)
    }

    create(req, res, next) {
        const sensor = new Sensor(req.body)
        sensor.save()
            .then(() => res.redirect('/sensors/create'))
            .catch(error => {
                next(error)
            })
    }

    update(req, res, next) {
        Sensor.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/sensors/create'))
            .catch(next)
    }
    
    delete(req, res, next) {
        Sensor.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }
}

module.exports = new SensorController()

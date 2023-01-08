const Sensor = require('../model/Sensor')

class SensorController {
    show(req, res, next) {
        Sensor.find({})
            .then(sensors => res.json(sensors))
            .catch(next)
    }

    create(req, res, next) {
        const sensor = new Sensor(req.body)
        sensor.save()
            .then(sensors => res.json(sensors))
            .catch(error => {
                
            })
    }

    update(req, res, next) {
        Sensor.updateOne({ _id: req.params.id }, req.body)
            .then(res.status(200).json("Updated successfully!"))
            .catch(next)
    }
    
    delete(req, res, next) {
        Sensor.deleteOne({ _id: req.params.id })
            .then(sensors => {
                res.status(200).json("Deleted successfully") 
            })
            .catch(next)
    }
}

module.exports = new SensorController()

const Home = require('../model/Home')

class HomeController {
    show(req, res, next) {
        Home.find({})
            .then(homes => res.json(homes))
            .catch(next)
    }

    create(req, res, next) {
        const home = new Home(req.body)
        home.save()
            .then(homes => res.json(homes))
            .catch(error => {
                
            })
    }

    update(req, res, next) {
        Home.updateOne({ _id: req.params.id }, req.body)
            .then(res.status(200).json("Updated successfully!"))
            .catch(next)
    }
    
    delete(req, res, next) {
        Home.deleteOne({ _id: req.params.id })
            .then(homes => {
                res.status(200).json("Deleted successfully") 
            })
            .catch(next)
    }
}

module.exports = new HomeController()

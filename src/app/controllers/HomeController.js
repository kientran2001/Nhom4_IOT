const Home = require('../model/Home')

class HomeController {
    show(req, res, next) {
        Home.find({})
        .then(homes => res.render('/homes', {
            homes: multipleMongooseToObject(homes)
        }))
            .catch(next)
    }

    create(req, res, next) {
        const home = new Home(req.body)
        home.save()
            .then(() => res.redirect('/homes/create'))
            .catch(error => {
                
            })
    }

    update(req, res, next) {
        Home.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/homes/create'))
            .catch(next)
    }
    
    delete(req, res, next) {
        Home.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new HomeController()

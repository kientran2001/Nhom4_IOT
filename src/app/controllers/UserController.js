const User = require('../model/User')

class UserController {
    show(req, res, next) {
        User.find({})
            .then(users => res.render('/users', {
                users: multipleMongooseToObject(users)
            }))
            .catch(next)
    }

    create(req, res, next) {
        const user = new User(req.body)
        user.save()
            .then(() => res.redirect('/users/create'))
            .catch(error => {
                
            })
    }

    update(req, res, next) {
        User.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/users/create'))
            .catch(next)
    }
    
    delete(req, res, next) {
        User.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new UserController()

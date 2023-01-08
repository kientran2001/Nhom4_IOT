const sensorsRouter = require('./sensors')
const devicesRouter = require('./devices')
const homesRouter = require('./homes')
const usersRouter = require('./users')

function route(app) {
    
    app.get('/', (req, res) => {
        res.send('Hello World')
    })
    app.use('/sensors', sensorsRouter)
    app.use('/devices', devicesRouter)
    app.use('/homes', homesRouter)
    app.use('/users', usersRouter)
    
}

module.exports = route


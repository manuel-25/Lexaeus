const user = require('../models/user')
const db = require('./../database/models')

// Saves user in session if logged 
function userLoggedMiddleware(req, res, next) {
    db.User.findOne({
        where:{
            email: req.cookies && req.cookies.userEmail ? req.cookies.userEmail : null
        }
    })
    .then(user => {
        let logged = user
    
        if(req.session && req.session.user){
            res.locals.isLogged = true
        }

        res.locals.user = logged
    
        next()
    })
    .catch(err => res.render(err))
}

module.exports = userLoggedMiddleware
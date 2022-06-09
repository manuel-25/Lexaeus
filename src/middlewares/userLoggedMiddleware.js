const user = require('../models/user')
const db = require('./../database/models')

// Saves user in session if logged 
function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false

    let emailInCookie = req.cookies.userEmail
    let userFromCookie = user.search('email', emailInCookie)


    if(userFromCookie){
        req.session.user = userFromCookie
    }

    if(req.session.user){
        res.locals.isLogged = true
        res.locals.user = req.session.user
        res.locals.isAdmin = req.session.isAdmin
    }

    next()
}

module.exports = userLoggedMiddleware
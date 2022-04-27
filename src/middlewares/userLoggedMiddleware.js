const user = require('../models/user')

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
    }

    next()
}

module.exports = userLoggedMiddleware
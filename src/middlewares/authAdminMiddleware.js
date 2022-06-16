function authAdminMiddleware(req, res, next) {
    let user = req.session.user
    if (user.isAdmin == 'false') {
        return res.redirect('/')
    }
    next();
}

module.exports = authAdminMiddleware;
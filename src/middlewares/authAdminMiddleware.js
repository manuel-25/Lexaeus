function authAdminMiddleware(req, res, next) {
    if (req.session.user.isAdmin == false) {
        return res.redirect('/')
    }
    next();
}

module.exports = authAdminMiddleware;
function authAdminMiddleware(req, res, next) {
    if (req.session.isAdmin == false) {
        return res.redirect('/')
    }
    next();
}

module.exports = authAdminMiddleware;
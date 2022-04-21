const { body } = require('express-validator')

const validationsLogin = [
    body('email').notEmpty().withMessage('Tienes que escribir el Email').bail().isEmail().withMessage('Tiene que ser un Email valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña')//.bail()
    //.isLength({min: 8}).withMessage('Debe contener al menos 8 caracteres')
]

module.exports = validationsLogin
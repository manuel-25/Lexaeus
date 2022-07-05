const path = require('path')
const bcrypt = require('bcryptjs')
const validator = require('express-validator')

const model = {
    encryptPassword: data => {
        return bcrypt.hashSync(data, 10)
    },
    
    validateRegisterForm: [
        validator.body('firstName').notEmpty().withMessage('El nombre es obligatorio'),
        validator.body('lastName').notEmpty().withMessage('El apellido es obligatorio'),
        validator.body('email').notEmpty().withMessage('El email es obligatorio').bail().isEmail().withMessage('Email invalido'),
        validator.body('password').notEmpty().withMessage('La contraseña es obligatoria').bail()
        .isLength({min: 8}).withMessage('Minimo 8 caracteres')
    ],
    validateLoginForm: [
        validator.body('email').notEmpty().withMessage('El email es obligatorio').bail().isEmail().withMessage('Invalid Email'),
        validator.body('password').notEmpty().withMessage('La contraseña es obligatoria')
            .bail().isLength({min: 3}).withMessage('Minimo 8 caracteres')
    ]
}

module.exports = model
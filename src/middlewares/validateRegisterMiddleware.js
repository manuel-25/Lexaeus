const { body } = require('express-validator')
const path = require('path')

const validations = [
    body('firstName').notEmpty().withMessage('Tienes que escribir el Nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir el Apellido'),
    body('email').notEmpty().withMessage('Tienes que escribir el Email').bail().isEmail().withMessage('Tiene que ser un Email valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
    .isLength({min: 8}).withMessage('Debe contener al menos 8 caracteres'),
    body('avatar').custom((value, {req}) =>{
        let file = req.file
        let acceptedExtensions = ['.jpg', '.gif', '.png', '.jfif', '.jpeg']

        if(!file){
            //throw new Error('Tienes que subir una imagen') 
        } else {
            let fileExtension = path.extname(file.originalname)
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
            }
        }
        return true
    })
]

module.exports = validations
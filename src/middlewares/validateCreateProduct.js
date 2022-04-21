const { body } = require('express-validator')
const path = require('path')

const validations = [
    body('name').notEmpty().withMessage('Escribe el Nombre del Producto'),
    body('stock').notEmpty().withMessage('Completa el Stock'),
    body('color').notEmpty().withMessage('Completa el Color'),
    body('price').notEmpty().withMessage('Completa el Precio'),
    body('size').notEmpty().withMessage('Completa el Talle'),
    body('img').custom((value, {req}) =>{
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
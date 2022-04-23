const path = require('path')
const fs = require('fs') //Leer y escribir archivo .json
const validator = require('express-validator')

const model = {
    filename: path.resolve(__dirname, '..', 'database', 'products.json'),
    read: () => fs.readFileSync(model.filename, 'utf-8'),
    all: () => JSON.parse(model.read()),
    write: (data) => fs.writeFileSync(model.filename, JSON.stringify(data, null, 2)),
    search: (prop, value) => model.all().find(element => element[prop] == value),   //Find By Field

    generateId: function() {
        let allProducts = model.all()
        let lastProduct = allProducts.pop()
        if(lastProduct){
            return lastProduct.id + 1
        }
        return 1
    },

    findByPk: function(id) {
        let allProducts = model.all()
        let productFound = allProducts.find(oneProduct => oneProduct.id == id)
        return productFound
    },

    findByCategory: function(category) {
        let allProducts = model.all()
        let results = allProducts.filter(oneProduct => oneProduct.category == category)
        return results.length > 0 ? results : null
    }, 

    validateUpdate: (data) => {
        let productValidate = JSON.parse(JSON.stringify(data))
        
        //Parsear Strings a Numeros
        productValidate.price = parseFloat(data.price)
        productValidate.stock = parseInt(data.stock)
        productValidate.category = parseInt(data.category)

        if(productValidate.category && !Number.isInteger(productValidate.category)){
            data.category = 4
        }


        //Validar size
        productValidate.size = data.size.toUpperCase()
        if(productValidate.size.includes(",")){
            productValidate.size = data.size.split(",")
        } else {
            productValidate.size = data.size.split(" ")
        }

        return productValidate
    },    //Agregar Validar Imagen

    validateCreate: (body, file) => {
        //Validar Imagen
        if(file){
            body = {
                ...body,
                img: file.filename
            }
        } else {
            body = {
                ...body,
                img: "default-img.jpg"
            }
        }

        //Parsear Strings a Numeros
        body.price = parseFloat(body.price)
        body.stock = parseInt(body.stock)
        body.category = parseInt(body.category)

        //Validar size
        body.size = body.size.toUpperCase()
        if(body.size.includes(",")){
            body.size = body.size.split(",")
        } else {
            body.size = body.size.split(" ")
        }
        return body
    },

    validateCreateForm: [
        validator.body('name').notEmpty().withMessage('Escribe el Nombre del Producto'),
        validator.body('stock').notEmpty().withMessage('Completa el Stock'),
        validator.body('color').notEmpty().withMessage('Completa el Color'),
        validator.body('price').notEmpty().withMessage('Completa el Precio'),
        validator.body('size').notEmpty().withMessage('Completa el Talle'),
        validator.body('img').custom((value, {req}) =>{
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
    ],

    create: function(productData){
        let allProducts = model.all()
        let newProduct = {
            id: model.generateId(),
            ...productData
        }
        allProducts.push(newProduct)
        model.write(allProducts)
        return newProduct
    },

    update: (id, data) => {
        let allProducts = model.all()

        let updated = allProducts.map(e => {
            if(e.id == id){
                e.name = data.name
                e.category = data.category
                e.description = data.description
                e.stock = data.stock
                e.size = data.size
                e.color = data.color
                e.price = data.price
                data.img ? e.img = data.img : null
                return e
            }
            return e
        })
        model.write(updated)
        let product = model.search('id', id)
        return product
    },

    delete: function(id){
        let allProducts = model.all()
        let finalProducts = allProducts.filter(oneProduct => oneProduct.id !== id)
        model.write(finalProducts)
        if(allProducts.length() == finalProducts.length()){
            return false
        }
        return true
    }
}

module.exports = model

// node models/product.js   
//path.resolve(__dirname, '..', 'data', 'products.json'


const path = require('path')
const fs = require('fs')
const validator = require('express-validator')
const file = require('./file')

const model = {
    filename: path.resolve(__dirname, '..', 'database', 'products.json'),
    read: () => fs.readFileSync(model.filename, 'utf-8'),
    all: () => JSON.parse(model.read()),
    write: (data) => fs.writeFileSync(model.filename, JSON.stringify(data, null, 2)),
    search: (prop, value) => model.all().find(element => element[prop] == value),   //Find By Field

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

    findByOffert: () => model.all().filter(e => e.offert ),

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

    validateCreate: (body) => {
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

    generated: data => Object({
        id: model.all().length == 0 ? 1 : model.all().pop().id + 1,
        name: data.name,
        category: data.category,
        description: data.description,
        img: data.files.map(f => file.create(f).id),
        stock: data.stock,
        size: data.size,
        color: data.color,
        price: data.price,
        offert: data.offert ? true : false
    }),

    create: (data) => {
        let all = model.all()
        let product = model.generated(data)
        all.push(product)
        model.write(all)
        return product
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
                e.offert = data.offert ? true : false
                return e
            }
            return e
        })
        model.write(updated)
        let product = model.search('id', id)
        return product
    },

    delete: id => model.write(model.all().filter(e => e.id != id))
}

module.exports = model

// node models/product.js   


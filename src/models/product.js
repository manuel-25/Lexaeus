const path = require('path')
const fs = require('fs') //Leer y escribir archivo .json

const model = {
    filename: path.resolve(__dirname, '..', 'database', 'products.json'),

    getData: function() {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))      //Transforma en un array
    },

    generateId: function() {
        let allProducts = this.findAll()
        let lastProduct = allProducts.pop()
        if(lastProduct){
            return lastProduct.id + 1
        }
        return 1
    },

    findAll: function(){
        return this.getData()
    },

    findByPk: function(id) {
        let allProducts = this.findAll()
        let productFound = allProducts.find(oneProduct => oneProduct.id == id)
        return productFound
    },

    search: (prop, value) => model.findAll().find(element => element[prop] == value),   //Find By Field

    findByCategory: function(category) {
        let allProducts = model.findAll()
        let results = allProducts.filter(oneProduct => oneProduct.category == category)
        return results.length > 0 ? results : null
    }, 

    write: (data) => fs.writeFileSync(model.filename, JSON.stringify(data, null, 2)),

    create: function(productData){
        let allProducts = model.findAll()
        let newProduct = {
            id: model.generateId(),
            ...productData
        }
        allProducts.push(newProduct)
        model.write(allProducts)
        return newProduct
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

    update: (id, data) => {
        let allProducts = model.getData()

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
        let allProducts = model.findAll()
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


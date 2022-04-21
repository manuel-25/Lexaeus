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

    findByField: function(field, text) {
        let allProducts = this.findAll()
        let productFound = allProducts.find(oneProduct => oneProduct[field] == text)
        return productFound
    },

    findByCategory: function(category) {
        let allProducts = this.findAll()
        let finalProducts = allProducts.filter(oneProduct => oneProduct.category == category)
        return finalProducts
    },

    create: function(productData){
        let allProducts = this.findAll()
        let newProduct = {
            id: this.generateId(),
            ...productData
        }
        allProducts.push(newProduct)
        fs.writeFileSync(this.filename, JSON.stringify(allProducts, null, ' '))
        return newProduct
    },
    update: function(id) {
        productToUpdate = model.findByPk(id)

        productToUpdate.name = req.body.name
        productToUpdate.category = req.body.category
        productToUpdate.price = req.body.price
        productToUpdate.img = req.body.img
        productToUpdate.description = req.body.description
        productToUpdate.stock = req.body.stock
        productToUpdate.size = req.body.size
        productToUpdate.color = req.body.color

        allProducts = model.getData()

        for(let i = 0; i < allProducts.length(); i++){
            if(allProducts[i].id === id) {
                return allProducts[i] = productToUpdate
            }
        }
        fs.writeFileSync(this.filename, JSON.stringify(allProducts, null, ' '))
    },

    delete: function(id){
        let allProducts = this.findAll()
        let finalProducts = allProducts.filter(oneProduct => oneProduct.id !== id)
        fs.writeFileSync(this.filename, JSON.stringify(finalProducts, null, ' '))
        if(allProducts.length() == finalProducts.length()){
            return false
        }
        return true
    }
}

module.exports = model

// node models/product.js   
//path.resolve(__dirname, '..', 'data', 'products.json'


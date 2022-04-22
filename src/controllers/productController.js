const product = require('../models/product')
const fs = require('fs');
const { validationResult } = require('express-validator');

const controller = {
    getProducts: (req, res) => {
        categoryId = product.findByCategory(req.params.id)
        console.log(res.locals)
        res.render("products/category", { products: categoryId})
    },

    cart: (req, res) => {res.render("products/cart")},

    detail: (req, res) => {res.render("products/detail")},

    create: (req, res) => { res.render("products/create") },

    detailProduct: (req, res) => {

        let productoDeseado = product.findByPk(req.params.id)
        res.render("products/detail", { productoAMostrar: productoDeseado })
    },

    processCreate: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
			return res.render('products/create', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}

        //Validar Imagen
        if(req.file){
            req.body = {
                ...req.body,
                img: req.file.filename
            }
        } else {
            req.body = {
                ...req.body,
                img: "default-img.jpg"
            }
        }

        //Parsear Strings a Numeros
        req.body.price = parseFloat(req.body.price)
        req.body.stock = parseInt(req.body.stock)
        req.body.category = parseInt(req.body.category)


        //Validar size
        req.body.size = req.body.size.toUpperCase()
        if(req.body.size.includes(",")){
            req.body.size = req.body.size.split(",")
        } else {
            req.body.size = req.body.size.split(" ")
        }

        product.create(req.body)
        res.redirect('/products/create');
    },

    update: (req, res) => {
        res.render("products/modify", { product: product.findByPk(req.params.id)}) 
    },

    processUpdate: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
			return res.render('products/create', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}

        //Validar Imagen


        //Parsear Strings a Numeros
        req.body.price = parseFloat(req.body.price)
        req.body.stock = parseInt(req.body.stock)
        req.body.category = parseInt(req.body.category)

        if(req.body.category && !req.body.category.isInteger()){
            req.body.category = 4
        }


        //Validar size
        req.body.size = req.body.size.toUpperCase()
        if(req.body.size.includes(",")){
            req.body.size = req.body.size.split(",")
        } else {
            req.body.size = req.body.size.split(" ")
        }

        product.update(req.body)

        let url = '/products/detail/' + req.body.id;
        res.redirect(url);
    },

    delete: (req, res) => {

        product.delete(req, res);
        res.redirect('/products');

    }
}

module.exports = controller;
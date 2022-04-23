const product = require('../models/product')
const fs = require('fs');
const { validationResult } = require('express-validator');

const controller = {
    show: (req, res) => {
        category = product.findByCategory(req.params.id)
        res.render("products/category", {
            style: ['category'],
            title: 'Productos',                      // mejorar
            products: category
        })
    },

    cart: (req, res) => res.render("products/cart", {
        style: ['cart'],
        title: 'Bolsa de Compra'
    }),

    detail: (req, res) =>res.render("products/detail", {
        style: ['producto'],
        title: 'Detalle',
        product: product.search("id", req.params.id)
    }),

    create: (req, res) => res.render("products/create", {
        style: ['createProduct'],
        title: 'Nuevo Producto'
    }),

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

    update: (req, res) => res.render("products/modify",{
        style: ['createProduct'],
        title: 'Actualizar',
        product: product.search("id", req.params.id)
    }),

    processUpdate: (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
			return res.render('products/modify', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}
        let validated = product.validateUpdate(req.body)
        product.update(req.params.id, validated)

        let url = '/products/detail/' + req.params.id;
        return res.redirect(url);
    },

    delete: (req, res) => {

        product.delete(req, res);
        res.redirect('/products');

    }
}

module.exports = controller;
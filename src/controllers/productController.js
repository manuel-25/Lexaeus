const product = require('../models/product')
const file = require('../models/file')
const { validationResult } = require('express-validator');

const controller = {
    show: (req, res) => {
        let result = product.findByCategory(req.params.id)
        return result ? res.render("products/category", {
            style: ['category'],
            title: 'Categoria | '+ result[0].category,
            products: result
        }) : res.render("error", {
            msg: "Producto no encontrado!"
        })
    },

    showSale: (req, res) => {
        let result = product.findByOffert()
        res.render("products/category", {
            style: ['category'],
            title: 'Ofertas',
            products: result
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
				oldData: req.body,
                style: ['createProduct'],
                title: 'Nuevo Producto'
			})
		}

        req.body.files = req.files
        req.body = product.validateCreate(req.body)
        product.create(req.body)
        res.redirect('/products/create');                       // Redirigir a /products/detail/:id------------------------
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
				oldData: req.body,
                style: ['createProduct'],
                title: 'Actualizar',
                product: product.search("id", req.params.id)
			})
		}
        
        let validated = product.validateUpdate(req.body)
        product.update(req.params.id, validated)

        let url = '/products/detail/' + req.params.id
        return res.redirect(url);
    },

    delete: (req, res) => {
        product.delete(req.body.id)
        res.redirect('/products/category/'+req.params.id)
    }
}

module.exports = controller;
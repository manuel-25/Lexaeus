const product = require('../models/product')
const file = require('../models/file')
const { validationResult } = require('express-validator')
const db = require('../database/models')

const controller = {
    show: (req, res) => {
        let category_id = req.params.id
        db.Product.findAll({
            include: [{association: "categories"}, {association: "color"}, {association: "files"} ,{association: "sizes"}],
            where: {
                category_id: category_id
            },
        })
        .then((products) => {
            //console.log(products[0].dataValues.sizes[0].dataValues.size)
            res.render("products/category", {
                style: ['category'],
                title: products[0].categories.name,
                products: products
            })
        })
        .catch((err) => console.log('error: '+err))
    },

    sale: (req, res) => {
        db.Product.findAll({
            where: {
                offert: 'true'
            }
        })
        .then((products) => {
            res.render("products/category", {
                style: ['category'],
                title: 'Ofertas',
                products: products
            })
        })
        .catch((err) => console.log('error: '+err))
    },

    cart: (req, res) => res.render("products/cart", {
        style: ['cart'],
        title: 'Bolsa de Compra'
    }),

    detail2: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then((products) => {
            res.render("products/detail", {
                style: ['producto'],
                title: 'Detalle',
                product: products
            })
        })
    },

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
        let result = product.validateCreate(req.body)
        let files = result.files
        delete result.files
        console.log(result)

        db.Product.create(
                result
        )
        .then((products) => {
            files.forEach(file => {
                db.File.create({
                    url: file
                })
                .then((file) => {
                    console.log(file)
                })
            })
        })
        .catch((err) => console.log(err))


        res.redirect('/products/create')
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
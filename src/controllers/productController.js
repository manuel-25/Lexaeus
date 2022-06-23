const product = require('../models/product')
const file = require('../models/file')
const { validationResult } = require('express-validator')
const db = require('../database/models')
const { sequelize } = require('../database/models')

const controller = {
    show: (req, res) => {
        let category_id = req.params.id
        db.Product.findAll({
            logging: false,
            include: [{association: "categories"}, {association: "color"}, {association: "files"}],
            where: {
                category_id: category_id
            },
        })
        .then((products) => {
            res.render("products/category", {
                style: ['category'],
                title: products[0].categories.name,
                products: products
            })
        })
        .catch(err => res.render("error", {error: err}))
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
        .catch(err => res.render("error", {error: err}))
    },

    cart: (req, res) => res.render("products/cart", {
        style: ['cart'],
        title: 'Bolsa de Compra'
    }),

    detail: (req, res) => {
        let category_id = req.params.category
        let allProductsPromise = db.Product.findAll({
            include: [{association: "categories"}, {association: "color"}, {association: "files"}],
            where: {
                category_id: category_id
            },
        })
        let oneProductPromise = db.Product.findOne({
            include: [{association: "color"}, {association: "files"} ],
            where: {
                id: req.params.id
            }
        })
        Promise.all([allProductsPromise, oneProductPromise])
        .then((values) => {
            res.render("products/detail", {
                style: ['detail'],
                title: 'Detalle',
                rawProduct: values[1],
                allProducts: values[0]
            })
        })
        .catch(err => res.render("error", {error: err}))
    },

    create: (req, res) => {
        db.Color.findAll({raw:true})
        .then((colors) => {
            res.render("products/create", {
                style: ['createProduct'],
                title: 'Nuevo Producto',
                colors: colors
            })
        })
        .catch(err => res.render("error", {error: err}))
    },

    processCreate: (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
			return res.render('products/create', {
				errors: resultValidation.mapped(),
				oldData: req.body,
                style: ['createProduct'],
                title: 'Nuevo Producto',
			})
		}

        req.body.files = req.files
        let validated = product.validate(req.body)

        db.Product.create({
            ...validated
        }, {
            include: [{association: "files"}]
        })

        res.redirect('/products/create')
    },

    update: (req, res) => {
        let colorPromise = db.Color.findAll({raw:true})
        let productPromise = db.Product.findOne({
            include: [{association: "color"}, {association: "files"} ],
            where: {
                id: req.params.id
            }
        })
        Promise.all([productPromise, colorPromise])
        .then((values) => {
            res.render("products/modify",{
                style: ['createProduct'],
                title: 'Editar',
                product: values[0],
                colors: values[1]
            })
        })
        .catch(err => res.render("error", {error: err}))
    },

    processUpdate: (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
            let colorPromise = db.Color.findAll({raw:true})
            let productPromise = db.Product.findOne({
                include: [{association: "color"}, {association: "files"} ],
                where: {
                    id: req.params.id
                }
            })
            Promise.all([productPromise, colorPromise])
            .then((values) => {
                res.render("products/modify",{
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    style: ['createProduct'],
                    title: 'Editar',
                    product: values[0],
                    colors: values[1]
                })
            })
            .catch(err => res.render("error", {error: err}))
		} else {
            let validated = product.validateUpdate(req.body)
            
            db.Product.update({
                ...validated,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then((product) => {
                let url = '/products/detail/' + req.params.category + '/' +req.params.id
                return res.redirect(url)
            })
            .catch(err => res.render("error", {error: err}))
        }
    },

    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            res.redirect('/products/category/' + req.params.category)
        })
    }


}

module.exports = controller
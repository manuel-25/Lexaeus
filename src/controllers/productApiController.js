const db = require('../database/models')
const product = require('../models/product')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    list: (req, res) => {
        db.Product.findAll()
        .then(products => {
            return res.status(200).json({
                data: products,
                meta: {
                    status: 200,
                    total: products.length,
                    url: "api/products"
                }
            })
        })
        .catch(err => {
            const response = {
                meta: {
                    status: 400,
                    url: "api/products"
                },
                error: "Not Found"
            }
            res.status(400).json(response)
        })
    },

    show: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {
            if(product.onList === 'false') {
                return res.status(403).json({
                    meta: {
                        status: 403,
                        total: product.length,
                        url: "api/products/" + req.params.id
                    },
                    data: null,
                })
            }
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: product.length,
                    url: "api/products/" + req.params.id  
                },
                data: product
            })
        })
        .catch(err => {
            const response = {
                meta: {
                    status: 400,
                    url: "api/products/" + req.params.id  
                },
                error: "Not Found"
            }
            res.status(400).json(response)
        })
    },

    store: (req, res) => {
        //let validated = product.validate(req.body)
        db.Product.create({
            ...req.body
        })
        .then(product => {
            return res.status(200).json({
                meta: {
                    status: 200,
                    url: "api/products/create"
                },
                data: product
            })
        })
        .catch(err => {
            const response = {
                meta: {
                    status: 400,
                    url: "api/products/create"
                },
                error: "Not Found"
            }
            res.status(400).json(response)
        })
    },

    delete: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(product => {
            res.status(200).json(product)
        })
    },

    search: (req, res) => {
        console.log(req.query.keyword)
        db.Product.findAll({
            where: {
                name: { [Op.like]: '%' + req.query.keyword + '%'}
            }
        })
        .then(products => {
            if (!products.length > 0) {
                return res.status(403).json({
                    meta: {
                        status: 403,
                        total: product.length,
                        url: "api/products/" + req.params.id
                    },
                    data: null,
                })
            }
            return res.status(200).json({
                meta: {
                    status: 200,
                    total: products.length,
                    url: "api/products/search"
                },
                data: products
            })
        })
        .catch(err => {
            const response = {
                meta: {
                    status: 400,
                    url: "api/products/search"
                },
                err
            }
            res.status(400).json(response)
        })
    }
}
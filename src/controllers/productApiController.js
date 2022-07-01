const db = require('../database/models')
const product = require('../models/product')


module.exports = {
    list: (req, res) => {
        db.Product.findAll()
        .then(products => {
            return res.status(200).json({
                total: products.length,
                data: products,
                status: 200
            })
        })
    },

    show: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {
            console.log(product)
            if(product.onList === 'false') {
                return res.status(200).json({
                    data: null,
                    status: 200
                })
            }
            return res.status(200).json({
                data: product,
                status: 200
            })
        })
        .catch(err => {
            return res.send(err)
        })
    },

    /*store: (req, res) => {
        let validated = product.validate(req.body)
        db.Product.create({
            ...validated
        })
        .then(product => {

        })
    },*/

    
}
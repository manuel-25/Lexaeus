const express = require("express")
const router = express.Router()
const products = require('../controllers/productApiController')

router.get('/products', products.list)
router.get('/product/search', products.search)
router.get('/products/:id', products.show)
router.post('/products/create', products.store)
router.delete('/products/delete/:id', products.delete)

module.exports = router;
const express = require("express")
const router = express.Router()
const products = require('../controllers/productApiController')

router.get('/products', products.list)
router.get('/products/:id', products.show)


module.exports = router;
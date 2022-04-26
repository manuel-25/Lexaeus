const express = require("express");
const router = express.Router();
const multer = require('multer')


//Middlewares
const products = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware')
const authAdminMiddleware = require('../middlewares/authAdminMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const { validateCreateForm } = require('../models/product')

//Multer 
const storage = require('../middlewares/multerProductMiddleware')
const uploadFile = multer({ storage })



//Formulario Crear Producto
router.get("/create", authMiddleware, authAdminMiddleware, products.create)

//Procesar Crear Producto
router.post('/create', uploadFile.any(), validateCreateForm, products.processCreate)

//Mostrar Ofertas
router.get("/sale", products.showSale)

//Mostrar Productos
router.get("/category/:id", products.show)        //userLoggedMiddleware??

//Detalle de Product
router.get("/detail/:id", products.detail)

//Formulario Editar Producto
router.get("/edit/:id", authMiddleware, authAdminMiddleware, products.update)

//Procesar Editar Producto
router.put('/edit/:id', validateCreateForm, products.processUpdate)
//uploadFile.single('img')


//Procesar Eliminar Producto
router.delete("/category/:id", authMiddleware, authAdminMiddleware, products.delete)


//Carrito
router.get("/cart", userLoggedMiddleware, products.cart)


module.exports = router;
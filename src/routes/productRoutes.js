const express = require("express");
const router = express.Router();
const multer = require('multer')


//Middlewares
const products = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware')
const authAdminMiddleware = require('../middlewares/authAdminMiddleware');
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const validateCreateProduct = require('../middlewares/validateCreateProduct')

//Multer 
const storage = require('../middlewares/multerProductMiddleware')
const uploadFile = multer({ storage })



//Formulario Crear Producto
router.get("/create", products.create)
// authMiddleware, authAdminMiddleware,            -------------------AGREGAR LUEGO

//Procesar Crear Producto
router.post('/create', uploadFile.single('img'), validateCreateProduct, products.processCreate)

//Mostrar Productos
router.get("/category/:id", userLoggedMiddleware, products.show)

//Detalle de Product
router.get("/detail/:id", products.detail)


//Formulario Editar Producto
router.get("/edit/:id",  products.update)
//authMiddleware, authAdminMiddleware,              ---------------------AGREGAR LUEGO

//Procesar Editar Producto
router.put('/edit/:id', validateCreateProduct, products.processUpdate)
//uploadFile.single('img')


//Procesar Eliminar Producto
router.delete("/edit/:id", products.delete)


//Carrito
router.get("/cart", userLoggedMiddleware, products.cart)


module.exports = router;
const express = require("express")
const router = express.Router()
const multer = require('multer')


//Middlewares
const validationsRegister = require('../middlewares/validateRegisterMiddleware')
const validationsLogin = require('../middlewares/validateLoginMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

//Multer 
const storage = require('../middlewares/multerMiddleware')
const uploadFile = multer({ storage })

//Controller
const userController = require('../controllers/userController')



//Formulario de Registro
router.get('/register', guestMiddleware, userController.register)

//Procesar Registro
router.post('/register', uploadFile.single('avatar'), validationsRegister, userController.processRegister)
//uploadFile siempre antes que validations


//Formulario de Login
router.get('/login', guestMiddleware, userController.login)

//Procesar el Login
router.post('/login', validationsLogin, userController.processLogin)


//Perfil de Usuario
router.get('/profile', authMiddleware, userController.profile)

//Formulario Editar Perfil          -------> HACER
//router.get(/profile/edit, userController.profileEdit)

//Procesar Editar Perfil
router.put("/profile/edit", userController.updateProfile)


// Logout
router.get('/logout/', userController.logout)




module.exports = router;
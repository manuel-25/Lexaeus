const express = require('express')
const app = express()
const method = require('method-override')
const session = require('express-session')
const cookies = require('cookie-parser')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

//Middlewares
app.use(session({
    secret: 'Mensaje secreto ;)',
    resave: false,
    saveUninitialized: false
}))
app.use(cookies())

app.use(userLoggedMiddleware)

app.use(express.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(method('_method'))

//Seteo Puerto
app.set("port", 3000);
app.listen(app.get("port"), () => console.log("Servidor Corriendo"));

// Template Engine
app.set('view engine', 'ejs');    
app.set('views', __dirname + '/views');


// Routers
const mainRoutes = require('./routes/indexRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

app.use('/', mainRoutes)
app.use('/users', userRoutes)
app.use('/products', productRoutes)


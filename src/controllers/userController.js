const user = require('../models/user')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const validator = require('express-validator');

const controller = {
    register: (req, res) => {
        res.render("users/register")
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req)

        //Validacion hay Errores 
        if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),		//.mapped() convierte el Array en un Objeto literal
				oldData: req.body
			})
		}

        //Validacion email ya esta en uso
        let userInDB = user.findByField('email', req.body.email)
        if(userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body
            })
        }

        //Validacion contrasenas iguales
        if(req.body.password !== req.body.confirm){
            return res.render('users/register', {
                errors: {
                    password: {
                        msg: 'Las Contraseñas no coinciden'
                    }
                },
                oldData: req.body
            })
        }

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10)
        }
        delete userToCreate.confirm

        //Validacion avatar
        if(req.file){
            userToCreate = {
                ...userToCreate,
                avatar: req.file.filename
            }
        } else {
            userToCreate = {
                ...userToCreate,
                avatar: 'default-img.jpg'
            }
        }

        let userCreated = user.create(userToCreate)
        console.log(userCreated)
        return res.redirect('/users/login')
    },

    login: (req, res) => {
        res.render("users/login")
    },

    processLogin: (req, res) => {
        const resultValidation = validationResult(req)

        if (resultValidation.errors.length > 0) {
			return res.render('users/login', {
				errors: resultValidation.mapped(),
				oldData: req.body
			})
		}
        let userToLogin = user.findByField('email', req.body.email)

        if(userToLogin){
            let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if(isOkPassword){
                delete userToLogin.password                 //Elimina una propiedad
                req.session.userLogged = userToLogin

                if(req.body.remember_user){
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60})
                }

                return res.redirect('/users/profile')
            }
        }
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'Credenciales invalidas'
                }
            }
        })

        //return res.send(req.body)
    },
    
    profile: (req, res) => {
        return res.render('users/profile', {
            user: req.session.userLogged
        })
    },

    updateProfile: (req, res) => {

        user.editar(req, res);
        let urlARedireccionar = '/users/profile';
        res.redirect(urlARedireccionar);
    },

    logout: (req, res) => {
        res.clearCookie('userEmail')
        req.session.destroy()
        return res.redirect('/users/login')
    }
}

module.exports = controller;
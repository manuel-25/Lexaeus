const user = require('../models/user')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const db = require('./../database/models')

const controller = {
    register: (req, res) => res.render("users/register", {
        style: ['register'],
        title: 'Registrate'
    }),
    processRegister: (req, res) => {
        // Express Validator Results
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
			return res.render('users/register', {
				errors: resultValidation.mapped(),	//.mapped() convierte el Array en un Objeto literal
				oldData: req.body,
                style: ['register'],
                title: 'Registrate'
			})
		}

        //Validacion email already in use
        let userInDB = user.search('email', req.body.email)
        if(userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg: 'Este email ya esta registrado'
                    }
                },
                oldData: req.body,
                style: ['register'],
                title: 'Registrate'
            })
        }

        //Validation confirm password
        if(req.body.password !== req.body.confirm){
            return res.render('users/register', {
                errors: {
                    password: {
                        msg: 'Las Contraseñas no coinciden'
                    }
                },
                oldData: req.body,
                style: ['register'],
                title: 'Registrate'
            })
        }
        delete req.body.confirm
        let userToCreate = req.body

        //Validation image
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

        user.create(userToCreate)
        return res.redirect('/users/login')
    },

    login: (req, res) => res.render("users/login", {
        style: ['login'],
        title: 'Iniciar sesión'
    }),

    processLogin: (req, res) => {
        const resultValidation = validationResult(req)
        if (resultValidation.errors.length > 0) {
			return res.render('users/login', {
				errors: resultValidation.mapped(),
				oldData: req.body,
                style: ['login'],
                title: 'Iniciar sesión'
			})
		}

        let userToLogin = user.search('email', req.body.email)
        
        if(userToLogin){
            let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if(isOkPassword && userToLogin.isActive){
                delete userToLogin.password
                delete req.body.password
                req.session.user = userToLogin
            } else {
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'Credenciales invalidas'
                        }
                    },oldData: req.body,
                    style: ['login'],
                    title: 'Iniciar sesión'
                })
            }
        }

        if(req.body.remember_user){
            res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60 * 24 * 30})
        }
        return res.redirect('/users/profile')
    },
    
    profile: (req, res) => res.render('users/profile', {
        style: ['profile'],
        title: 'Perfil',
        user: req.session.user
    }),

    updateProfile: (req, res) => {                          //refactor
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
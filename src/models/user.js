const path = require('path')
const fs = require('fs') //Leer y escribir archivo .json
const bcrypt = require('bcryptjs')
const validator = require('express-validator')

const model = {
    filename: path.resolve(__dirname, '..', 'database', 'users.json'),
    read: () => fs.readFileSync(model.filename, 'utf-8'),
    all: () => JSON.parse(model.read()),
    write: (data) => fs.writeFileSync(model.filename, JSON.stringify(data, null, 2)),
    search: (prop, value) => model.all().find(element => element[prop] == value),   //Find By Field
    generated: data => Object({
        id: model.all().length == 0 ? 1 : model.all().pop().id + 1,
        firstName: String(data.firstName),
        lastName: String(data.lastName),
        email: String(data.email),
        password: bcrypt.hashSync(data.password, 10),
        avatar: String(data.avatar),
        isAdmin: false,
        isActive: true
    }),
    create: data => {
        let all = model.all()
        let user = model.generated(data)
        all.push(user)
        model.write(all)
        return user
    },
    validateRegisterForm: [
        validator.body('firstName').notEmpty().withMessage('Tienes que escribir el Nombre'),
        validator.body('lastName').notEmpty().withMessage('Tienes que escribir el Apellido'),
        validator.body('email').notEmpty().withMessage('Tienes que escribir el Email').bail().isEmail().withMessage('Tiene que ser un Email valido'),
        validator.body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
        .isLength({min: 8}).withMessage('Debe contener al menos 8 caracteres'),
        validator.body('avatar').custom((value, {req}) =>{
            let file = req.file
            let acceptedExtensions = ['.jpg', '.gif', '.png', '.jfif', '.jpeg']
            if(!file){
                //throw new Error('Tienes que subir una imagen') 
            } else {
                let fileExtension = path.extname(file.originalname)
                if(!acceptedExtensions.includes(fileExtension)){
                    throw new Error(`Las extensiones permitidas son ${acceptedExtensions.join(', ')}`)
                }
            }
            return true
        })
    ],
    validateLoginForm: [
        validator.body('email').notEmpty().withMessage('Tienes que escribir el Email').bail().isEmail().withMessage('Tiene que ser un Email valido'),
        validator.body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail().isLength({min: 3}).withMessage('Debe contener al menos 3 caracteres')
    ],

    generateId: function() {
        let allUsers = model.all()
        let lastUser = allUsers.pop()
        if(lastUser){
            return lastUser.id + 1
        }
        return 1
    },

    delete: function(id){
        let allUsers = model.all()
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id)
        fs.writeFileSync(model.filename, JSON.stringify(finalUsers, null, ' '))
        return true
    },

    editar: (req, res) => {                                                 //refactor
        let usuarioAEditar = model.mostrar(req.params.idPerfil);

        usuarioAEditar.image = '/img/users/' + req.file.filename;

        let all = model.listar()

        for (let i = 0; i < all.length; i++) {
            if (all[i].id == req.params.idPerfil) {
                all[i] = usuarioAEditar;
                console.log(usuarioAEditar)
            }
        }
        fs.writeFileSync(path.resolve(__dirname, '..', 'database', 'users.json'), JSON.stringify(all, null, 2));
    }
}

module.exports = model
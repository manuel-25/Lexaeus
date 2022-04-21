const path = require('path')
const fs = require('fs') //Leer y escribir archivo .json
const validator = require('express-validator');

const model = {
    filename: path.resolve(__dirname, '..', 'database', 'users.json'),

    getData: function() {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'))      //Transforma en un array
    },

    generateId: function() {
        let allUsers = this.findAll()
        let lastUser = allUsers.pop()
        if(lastUser){
            return lastUser.id + 1
        }
        return 1
    },

    findAll: function(){
        return this.getData()
    },

    findByPk: function(id) {
        let allUsers = this.findAll()
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound
    },

    findByField: function(field, text) {
        let allUsers = this.findAll()
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound
    },

    create: function(userData){
        let allUsers = this.findAll()
        let newUser = {
            id: this.generateId(),
            ...userData,
            admin: false
        }
        allUsers.push(newUser)
        fs.writeFileSync(this.filename, JSON.stringify(allUsers, null, ' '))
        return newUser
    },

    delete: function(id){
        let allUsers = this.findAll()
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id)
        fs.writeFileSync(this.filename, JSON.stringify(finalUsers, null, ' '))
        return true
    },

    listar: () => JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'database', 'users.json'))),
    mostrar: id => model.listar().find(e => e.id == id),
    editar: (req, res) => {
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
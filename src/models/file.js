const path = require('path')
const fs = require('fs')

const model = {
    filename: path.resolve(__dirname, '..', 'database', 'files.json'),
    read: () => fs.readFileSync(model.filename, 'utf-8'),
    all: () => JSON.parse(model.read()),
    write: (data) => fs.writeFileSync(model.filename, JSON.stringify(data, null, 2)),

    generate: data => Object({
        id: model.all().length == 0 ? 1 : model.all().pop().id + 1,
        url: data.filename,
    }),

    create: data => {
        let newImage = model.generate(data)
        let all = model.all()
        all.push(newImage)
        model.write(all)
        return newImage
    }
}

module.exports = model
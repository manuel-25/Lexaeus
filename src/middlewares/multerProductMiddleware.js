const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '..', '..', 'public', 'img', 'products'))
	},
	filename: (req, file, cb) => {
		let fileName = `${file.originalname}`
		//let fileName = `${Date.now()}-${file.originalname}`
		cb(null, fileName);
	}
})

module.exports = storage
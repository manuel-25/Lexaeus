const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../uploads/products'))
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}-${file.originalname}`
		cb(null, fileName);
	}
})

module.exports = storage
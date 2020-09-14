const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
var multer = require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

var upload = multer({ storage: storage }).single('file');

exports.upload = asyncHandler(async (req, res, next) => {
	upload(req, res, function (err) {
		if (err instanceof multer.MulterError) {
			return res.status(500).json(err);
		} else if (err) {
			return res.status(500).json(err);
		}
	});
	res.status(200).json({ success: true });
});

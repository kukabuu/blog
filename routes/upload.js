const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage,
	limit: { fileSize: 2 * 1024 * 1024 }, //2 Mb
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
			const err = new Error("Extention");
			err.code = "EXTENTION";
			return cb(err);
		}
		cb(null, true);
	}
}).single("file");

// Image is add
router.post("/image", (req, res) => {
	upload(req, res, err => {
		let error = "";
		if (err) {
			if (err.code === "LIMIT_FILE_SIZE") {
				error = "Изображение не более 2 Мбайт!";
			}
			if (err.code === "EXTENTION") {
				error = "Только jpg, jpeg, png";
			}
		}
		res.json({
			ok: !error,
			error
		});
	});
});

module.exports = router;

const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const { uploadPDF, downloadExcel } = require("../controller/pdfController");

router.post("/upload", upload.single("pdf"), uploadPDF);

router.get("/download/:filename", downloadExcel);

module.exports = router;

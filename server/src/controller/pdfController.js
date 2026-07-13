const extractTextFromPDF = require("../services/pdfExtractor");
const parserFactory = require("../services/parsers/parserFactory");
const generateExcel = require("../services/excelGenerator");
const path = require("path");

exports.uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    }

    const text = await extractTextFromPDF(req.file.path);

    const fs = require("fs");

    fs.writeFileSync("output/extracted.txt", text);

    const parser = parserFactory(text);

    const transactions = parser(text);

    const excelPath = path.join("output", `${Date.now()}.xlsx`);

    await generateExcel(transactions, excelPath);

    const fileName = path.basename(excelPath);

    res.json({
      success: true,
      message: "Conversion successful",
      downloadUrl: `/api/pdf/download/${fileName}`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.downloadExcel = (req, res) => {
  const fileName = req.params.filename;

  const filePath = path.join("output", fileName);

  res.download(filePath, (error) => {
    if (error) {
      console.log(error);

      res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
  });
};

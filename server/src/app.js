const express = require("express");
const cors = require("cors");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PDF Converter Backend Running");
});

app.use("/api/pdf", pdfRoutes);

module.exports = app;

const ExcelJS = require("exceljs");

const generateExcel = async (transactions, filePath) => {
  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Bank Statement");

  worksheet.columns = [
    {
      header: "Date",
      key: "date",
      width: 15,
    },
    {
      header: "Description",
      key: "description",
      width: 35,
    },
    {
      header: "Debit",
      key: "debit",
      width: 15,
    },
    {
      header: "Credit",
      key: "credit",
      width: 15,
    },
    {
      header: "Balance",
      key: "balance",
      width: 15,
    },
  ];

  transactions.forEach((transaction) => {
    worksheet.addRow(transaction);
  });

  await workbook.xlsx.writeFile(filePath);
};

module.exports = generateExcel;

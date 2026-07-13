const parseRBSStatement = (text) => {
  let lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const startIndex = lines.findIndex((line) =>
    line.includes("Date Description Paid In"),
  );

  if (startIndex !== -1) {
    lines = lines.slice(startIndex + 1);
  }

  const transactions = [];

  let currentDate = "";
  let currentYear = "";
  let description = [];

  const dateRegex = /^(\d{2})\s([A-Z]{3})(?:\s(\d{4}))?/;

  const amountRegex =
    /([\d,]+\.\d{2})\s+([\d,]+\.\d{2})(?:\s+([\d,]+\.\d{2}))?$/;

  const stopWords = [
    "RETSTMT",
    "Registered in Scotland",
    "Take control of your finances",
    "Statement Abbreviations",
    "How to contact us",
    "Important information about compensation",
    "Dispute Resolution",
  ];

  for (let line of lines) {
    if (stopWords.some((word) => line.includes(word))) break;

    if (
      line.startsWith("Account Name") ||
      line.startsWith("Summary") ||
      line.startsWith("Welcome") ||
      line.startsWith("Page No") ||
      line.startsWith("Date Description") ||
      line.startsWith("BROUGHT FORWARD")
    ) {
      continue;
    }

    const dateMatch = line.match(dateRegex);

    if (dateMatch) {
      currentDate = `${dateMatch[1]} ${dateMatch[2]}`;

      if (dateMatch[3]) {
        currentYear = dateMatch[3];
      }

      line = line.replace(dateRegex, "").trim();
    }

    if (!line) continue;

    description.push(line);

    const amountMatch = line.match(amountRegex);

    if (!amountMatch) continue;

    const numbers = amountMatch.slice(1).filter(Boolean);

    let debit = "";
    let credit = "";
    let balance = "";

    if (numbers.length === 3) {
      // Paid In | Withdrawn | Balance
      credit = numbers[0];
      debit = numbers[1];
      balance = numbers[2];

      if (credit === "0.00") credit = "";
      if (debit === "0.00") debit = "";
    } else if (numbers.length === 2) {
      balance = numbers[1];

      const desc = description.join(" ");

      // Detect genuine credits
      if (
        desc.includes("OnLine Transaction") &&
        desc.includes("PYMT") &&
        !desc.includes("Card Transaction") &&
        !desc.includes("Direct Debit") &&
        !desc.includes("Charges")
      ) {
        credit = numbers[0];
      } else {
        debit = numbers[0];
      }
    }

    const desc = description.join(" ").replace(amountRegex, "").trim();

    transactions.push({
      date: currentYear ? `${currentDate} ${currentYear}` : currentDate,
      description: desc,
      debit,
      credit,
      balance,
    });

    description = [];
  }

  return transactions;
};

module.exports = parseRBSStatement;

const parseBankStatement = (text) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const transactions = [];

  for (let line of lines) {
    // looking for date pattern
    const dateMatch = line.match(/\d{2}[\/\-]\d{2}[\/\-]\d{2,4}/);

    if (!dateMatch) {
      continue;
    }

    const date = dateMatch[0];

    const parts = line.split(/\s+/);

    transactions.push({
      date,

      description: parts.slice(1, -3).join(" "),

      debit: parts[parts.length - 3] || "",

      credit: parts[parts.length - 2] || "",

      balance: parts[parts.length - 1] || "",
    });
  }

  return transactions;
};

module.exports = parseBankStatement;

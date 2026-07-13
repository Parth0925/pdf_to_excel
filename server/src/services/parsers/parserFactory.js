const parseRBSStatement = require("./rbsParser");

const parserFactory = (text) => {
  // Royal Bank of Scotland
  if (
    text.includes("Royal Bank of Scotland") ||
    text.includes("www.rbs.co.uk")
  ) {
    return parseRBSStatement;
  }

  // fallback
  return parseRBSStatement;
};

module.exports = parserFactory;

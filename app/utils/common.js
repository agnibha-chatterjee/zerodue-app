export function formatPhoneNumber(phoneNumber) {
  const areaCode = phoneNumber.slice(0, 3);
  const firstThreeDigits = phoneNumber.slice(3, 6);
  const lastFourDigits = phoneNumber.slice(6);
  return `(${areaCode}) ${firstThreeDigits}-${lastFourDigits}`;
}

export function unformatPhoneNumber(formattedNumber) {
  const digitsOnly = formattedNumber.replace(/\D/g, "");
  return digitsOnly;
}

export function getCardIssuer(cardName) {
  const lowerCaseCardName = cardName.toLowerCase();
  if (lowerCaseCardName.includes("chase")) {
    return "chase";
  }

  if (
    lowerCaseCardName.includes("american") ||
    lowerCaseCardName.includes("amex") ||
    lowerCaseCardName.includes("express")
  ) {
    return "amex";
  }

  if (
    lowerCaseCardName.includes("wells") ||
    lowerCaseCardName.includes("fargo") ||
    lowerCaseCardName.includes("wells fargo")
  ) {
    return "wellsFargo";
  }

  if (lowerCaseCardName.includes("discover")) {
    return "discover";
  }

  if (lowerCaseCardName.includes("capital")) {
    return "capitalOne";
  }

  if (lowerCaseCardName.includes("citi")) {
    return "citi";
  }

  if (lowerCaseCardName.includes("bank")) {
    return "bofa";
  }

  if (lowerCaseCardName.includes("alaska")) {
    return "alaska";
  }

  if (lowerCaseCardName.includes("paypal")) {
    return "paypal";
  }

  if (lowerCaseCardName.includes("barclay")) {
    return "barclays";
  }

  if (lowerCaseCardName.includes("apple")) {
    return "apple";
  }

  if (
    lowerCaseCardName.includes("discount") ||
    lowerCaseCardName.includes("tire") ||
    lowerCaseCardName.includes("discount tire")
  ) {
    return "discountTire";
  }

  return "visa";
}

export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? {
        value: (num / item.value).toFixed(digits).replace(regexp, ""),
        symbol: item.symbol,
      }
    : { value: "0", symbol: "" };
}

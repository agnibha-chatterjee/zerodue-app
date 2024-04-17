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

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getRandomItems(array, count) {
  const shuffledArray = array.slice();

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, count);
}

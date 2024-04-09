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

export function keysToCamelCase(o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamelCase(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamelCase(i);
    });
  }

  return o;
}

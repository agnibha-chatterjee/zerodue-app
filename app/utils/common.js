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

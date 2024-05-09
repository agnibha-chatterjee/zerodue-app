export const ZERODUE_BASE_URL =
  process.env.EXPO_PUBLIC_BACKEND_BASE_URL ?? "http://localhost:8000";

export const API_ENDPOINTS = {
  AUTH_STATUS: "/api/auth/status",
  SEND_VERIFICATION_SMS: "/api/auth/send-verification-sms",
  VERIFY_OTP: "/api/auth/verify-otp",
  FETCH_METHOD_ELEMENTS_TOKEN: "/api/auth/method-elements-token",
  COMPLETE_METHOD_ONBOARDING: "/api/auth/method-onboarding-complete",
  ALL_LIABILITIES: "/api/liabilities",
  ALL_CREDIT_CARDS: "/api/liabilities/credit-cards",
  BANK_ACCOUNTS: "/api/user/bank-account",
  PAYMENTS: "/api/payment",
  INITIATE_PAYMENT: "/api/payment/initiate",
  REWARDS: "/api/rewards",
};

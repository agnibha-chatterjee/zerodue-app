export const ZERODUE_BASE_URL =
  process.env.EXPO_PUBLIC_BACKEND_BASE_URL ?? "http://localhost:8000";

export const API_ENDPOINTS = {
  GENERATE_OTP: "/api/auth/generate-otp",
  VERIFY_OTP: "/api/auth/verify-otp",
};

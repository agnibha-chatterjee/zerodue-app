import { API_ENDPOINTS } from "./api-routes";
import { createApi } from "./create-api";
import { HTTP_VERBS } from "./http-verbs";

export const generateOtp = (reqBody) => {
  return createApi({
    endpoint: API_ENDPOINTS.GENERATE_OTP,
    method: HTTP_VERBS.POST,
    body: reqBody,
  });
};

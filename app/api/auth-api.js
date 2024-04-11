import { ASYNC_STORAGE_KEYS } from "@constants/async-storage-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_ENDPOINTS } from "./api-routes";
import { createApi } from "./create-api";
import { HTTP_VERBS } from "./http-verbs";

async function getAsyncStorageValue(key) {
  try {
    return AsyncStorage.getItem(key);
  } catch (e) {
    console.log("Error in getting key from async storage", e);
  }
}

export const checkAuthStatus = async () => {
  const token = await getAsyncStorageValue(ASYNC_STORAGE_KEYS.AUTH_TOKEN);
  return createApi({
    endpoint: API_ENDPOINTS.AUTH_STATUS,
    method: HTTP_VERBS.GET,
    token,
  });
};

export const generateOtp = (reqBody) => {
  return createApi({
    endpoint: API_ENDPOINTS.GENERATE_OTP,
    method: HTTP_VERBS.POST,
    body: reqBody,
  });
};

export const verifyOtp = (reqBody) => {
  return createApi({
    endpoint: API_ENDPOINTS.VERIFY_OTP,
    method: HTTP_VERBS.POST,
    body: reqBody,
  });
};

export const fetchMehodElementsToken = async () => {
  const token = await getAsyncStorageValue(ASYNC_STORAGE_KEYS.AUTH_TOKEN);
  return createApi({
    endpoint: API_ENDPOINTS.FETCH_METHOD_ELEMENTS_TOKEN,
    method: HTTP_VERBS.GET,
    token,
  });
};

export const completeMethodOnboarding = async () => {
  const token = await getAsyncStorageValue(ASYNC_STORAGE_KEYS.AUTH_TOKEN);
  return createApi({
    endpoint: API_ENDPOINTS.COMPLETE_METHOD_ONBOARDING,
    method: HTTP_VERBS.GET,
    token,
  });
};

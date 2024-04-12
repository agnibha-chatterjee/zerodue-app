import { ASYNC_STORAGE_KEYS } from "@constants/async-storage-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_ENDPOINTS } from "./api-routes";
import { createApi } from "./create-api";
import { HTTP_VERBS } from "./http-verbs";

export const fetchAllUserPayments = async () => {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.AUTH_TOKEN);
  return createApi({
    endpoint: API_ENDPOINTS.PAYMENTS,
    method: HTTP_VERBS.GET,
    token,
  });
};

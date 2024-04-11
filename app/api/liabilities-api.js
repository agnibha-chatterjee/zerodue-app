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

export const fetchAllLiabilities = async () => {
  const token = await getAsyncStorageValue(ASYNC_STORAGE_KEYS.AUTH_TOKEN);
  return createApi({
    endpoint: API_ENDPOINTS.ALL_LIABILITIES,
    method: HTTP_VERBS.GET,
    token,
  });
};

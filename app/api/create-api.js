import { isEmpty } from "lodash";
import { ZERODUE_BASE_URL } from "./api-routes";
import { keysToCamelCase } from "@utils/common";

export const createApi = async ({
  endpoint,
  method,
  token,
  body,
  enableLogging,
  cookie,
  headers = {},
  includeCredentials = true,
  enabled = true,
} = {}) => {
  const reqHeaders = {
    "Content-Type": "application/json",
    ...(typeof window !== "undefined" && { Referer: window.location.origin }),
    ...(token && { Authorization: `Token ${token}` }),
    ...(cookie && { Cookie: cookie }),
    ...(!isEmpty(headers) && { ...headers }),
  };

  if (!enabled) {
    return Promise.resolve(null);
  }

  if (enableLogging) {
    console.log("Request Details: ", {
      completeUrl: ZERODUE_BASE_URL + endpoint,
      token,
      body: JSON.stringify(body),
      httpMethod: method,
      cookie,
      includeCredentials,
      headers: reqHeaders,
    });
  }

  try {
    const res = await fetch(ZERODUE_BASE_URL + endpoint, {
      method,
      headers: reqHeaders,
      ...(!isEmpty(body) && {
        body: JSON.stringify(body),
      }),
      credentials: includeCredentials ? "include" : "omit",
    });

    if (!res.ok) {
      const errorText = (await res.text()) ?? "";
      const status = res.status;
      const error = {
        method: method.toUpperCase(),
        endpoint: ZERODUE_BASE_URL + endpoint,
        status,
        ...(errorText && {
          errorFromServer: errorText.slice(0, 100),
        }),
        ...(!isEmpty(body) && {
          reqBody: body,
        }),
      };
      throw new Error(JSON.stringify(error));
    }

    const jsonResponse = await res.json();
    return keysToCamelCase(jsonResponse);
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log(
        "There was a SyntaxError (could be an error with the request or response, cross check both)",
        err
      );
    } else {
      console.error("[CrustData API Error]", err);
    }

    throw err;
  }
};

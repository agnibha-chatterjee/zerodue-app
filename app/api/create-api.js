import camelcaseKeys from "camelcase-keys";
import { isEmpty } from "lodash";
import snakecaseKeys from "snakecase-keys";

import { ZERODUE_BASE_URL } from "./api-routes";

export const createApi = async ({
  endpoint,
  method,
  token,
  body = {},
  enableLogging,
  headers = {},
  enabled = true,
}) => {
  const reqHeaders = {
    "Content-Type": "application/json",
    ...(!isEmpty(token) && { Authorization: `Bearer ${token}` }),
    ...(!isEmpty(headers) && { ...headers }),
  };

  if (!enabled) {
    return Promise.resolve(null);
  }

  if (enableLogging) {
    console.log("Request Details: ", {
      completeUrl: ZERODUE_BASE_URL + endpoint,
      token,
      body: JSON.stringify(snakecaseKeys(body, { deep: true })),
      httpMethod: method,
      headers: reqHeaders,
    });
  }

  try {
    const res = await fetch(ZERODUE_BASE_URL + endpoint, {
      method,
      headers: reqHeaders,
      ...(!isEmpty(body) && {
        body: JSON.stringify(snakecaseKeys(body, { deep: true })),
      }),
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
    const camelCasedResponse = camelcaseKeys(jsonResponse, { deep: true });

    return camelCasedResponse;
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.log(
        "There was a SyntaxError (could be an error with the request or response, cross check both)",
        err
      );
    } else {
      console.error("[API Error]", err);
    }

    throw err;
  }
};

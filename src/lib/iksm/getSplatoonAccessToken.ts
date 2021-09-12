import * as constants from "../config";
import { SuccessResponse as FlapgApp } from "./callFlapg";
import { ErrorResponse } from "../types";

interface SuccessResponse {
  result: {
    accessToken: string;
    expiresIn: number;
  };
}

export const getSplatoonAccessToken = async (
  idToken: string,
  flapgApp: FlapgApp
): Promise<ErrorResponse | SuccessResponse> => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      Host: "api-lp1.znc.srv.nintendo.net",
      "User-Agent":
        "com.nintendo.znca/" + constants.nsoappVersion + " (Android/7.1.2)",
      Accept: "application/json",
      "X-ProductVersion": constants.nsoappVersion,
      "Content-Type": "application/json; charset=utf-8",
      Connection: "Keep-Alive",
      Authorization: `Bearer ${idToken}`,
      "Content-Length": "37",
      "X-Platform": "Android",
      "Accept-Encoding": "gzip",
    },
    body: JSON.stringify({
      parameter: {
        id: 5741031244955648,
        f: flapgApp.result.f,
        registrationToken: flapgApp.result.p1,
        timestamp: flapgApp.result.p2,
        requestId: flapgApp.result.p3,
      },
    }),
  };

  const rowSplatoonAccessToken = await fetch(
    constants.splatoonAccessTokenURI,
    options
  );
  const splatoonAccessToken = await rowSplatoonAccessToken.json();
  return splatoonAccessToken;
};

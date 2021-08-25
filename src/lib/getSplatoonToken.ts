import * as constants from "~/lib/config";
import { SuccessResponse as UserInfo } from "~/lib/getUserInfo";
import { SuccessResponse as FlapgNso } from "~/lib/callFlapg";
import { ErrorResponse } from "./types";

export interface SuccessResponse {
  result: {
    webApiServerCredential: {
      accessToken: string;
    };
  };
}

export const getSplatoonToken = async (
  userLang: string,
  userInfo: UserInfo,
  flapg_nso: FlapgNso
): Promise<ErrorResponse | SuccessResponse> => {
  const options: RequestInit = {
    method: "POST",
    headers: {
      Host: "api-lp1.znc.srv.nintendo.net",
      "Accept-Language": userLang,
      "User-Agent": `com.nintendo.znca/${constants.nsoappVersion} (Android/7.1.2)`,
      Accept: "application/json",
      "X-ProductVersion": constants.nsoappVersion,
      "Content-Type": "application/json; charset=utf-8",
      Connection: "Keep-Alive",
      Authorization: "Bearer",
      "X-Platform": "Android",
      "Accept-Encoding": "gzip",
    },
    body: JSON.stringify({
      parameter: {
        f: flapg_nso.result.f,
        naIdToken: flapg_nso.result.p1,
        requestId: flapg_nso.result.p3,
        timestamp: flapg_nso.result.p2,
        naCountry: userInfo.country,
        naBirthday: userInfo.birthday,
        language: userInfo.language,
      },
    }),
  };
  const rowSplatoonTokenResponse = await fetch(
    constants.splatoonTokenURI,
    options
  );
  const splatoonTokenResponse = await rowSplatoonTokenResponse.json();
  return splatoonTokenResponse;
};

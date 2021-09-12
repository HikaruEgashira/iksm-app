import { v4 as uuid } from "uuid";

import { getAccessToken } from "./getAccessToken";
import { callFlapg } from "./callFlapg";
import { getUserInfo } from "./getUserInfo";
import { ErrorResponse } from "../types";
import { getSplatoonToken } from "./getSplatoonToken";
import { getSplatoonAccessToken } from "./getSplatoonAccessToken";
import * as constants from "../config";

export interface SuccessResponse {
  iksmSession: string;
}

/**
 * Returns a new cookie provided the session_token.
 */
export const getCookie = async (
  sessionToken: string,
  userLang: string
  //   userId: number
): Promise<ErrorResponse | SuccessResponse> => {
  const idResponse = await getAccessToken(sessionToken);
  if ("error" in idResponse) {
    return idResponse;
  }
  const accessToken = idResponse.accessToken;

  const userInfo = await getUserInfo(accessToken);
  if ("error" in userInfo) {
    return userInfo;
  }

  const guid = uuid();
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const iid = "nso";
  const flapgNso = await callFlapg(accessToken, guid, timestamp, iid);
  if ("error" in flapgNso) {
    return flapgNso;
  }

  const splatoonToken = await getSplatoonToken(userLang, userInfo, flapgNso);
  if ("error" in splatoonToken) {
    return splatoonToken;
  }

  const idToken = splatoonToken.result.webApiServerCredential.accessToken;
  const flapgApp = await callFlapg(idToken, guid, timestamp, "app");
  if ("error" in flapgApp) {
    return flapgApp;
  }

  const splatoonAccessToken = await getSplatoonAccessToken(idToken, flapgApp);
  if ("error" in splatoonAccessToken) {
    return splatoonAccessToken;
  }

  const options: RequestInit = {
    headers: {
      Host: "app.splatoon2.nintendo.net",
      "X-IsAppAnalyticsOptedIn": "false",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Encoding": "gzip,deflate",
      "X-GameWebToken": splatoonAccessToken.result.accessToken,
      "Accept-Language": userLang,
      "X-IsAnalyticsOptedIn": "false",
      Connection: "keep-alive",
      DNT: "0",
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 7.1.2; Pixel Build/NJH47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36",
      "X-Requested-With": "com.nintendo.znca",
    },
  };
  const rowIksmResponse = await fetch(
    `${constants.splatnetUrl}/?lang=${userLang}`,
    options
  );

  const re = /iksm_session=([a-f0-9]+);/;
  const iksmSession = re.exec(rowIksmResponse.headers.get("set-cookie") ?? "");
  if (!iksmSession) {
    return { error: "cannot find iksm_session" };
  }

  return { iksmSession: iksmSession[1] };
};

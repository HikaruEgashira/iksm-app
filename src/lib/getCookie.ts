import { v4 as uuid } from "uuid";

import { getAccessToken } from "./getAccessToken";
import { callFlapg } from "./callFlapg";

const requestId = uuid();
const timestamp = Math.floor(Date.now() / 1000).toString();

export const getCookie = async (
  sessionToken: string,
  userLang: string
  //   userId: number
) => {
  const accessTokenResult = await getAccessToken(sessionToken);
  const accessTokenJson = await accessTokenResult.json();
  const {
    access_token: accessToken,
    id_token: idToken,
  }: { access_token: string; id_token: string } = accessTokenJson;

  console.log("/2.0.0/users/me");
  const userInfoResponse = await fetch(
    "https://api.accounts.nintendo.com/2.0.0/users/me",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const userInfo = await userInfoResponse.json();

  const { login_app, login_nso } = await callFlapg(
    accessToken,
    requestId,
    timestamp
  );
  console.log(login_app, login_nso);

  //   const headers = {
  //     Connection: "Keep-Alive",
  //     "Accept-Encoding": "gzip",
  //     "User-Agent": "com.nintendo.znca/1.5.2 (Android/7.1.2)",
  //     "Accept-Language": userLang,
  //     Authorization: "Bearer",
  //     "X-Platform": "Android",
  //     "X-ProductVersion": "1.5.2",
  //   };
  //   console.log("/v1/Account/Login");
  //   const qs = new URLSearchParams({
  //     f: login_nso.f,
  //     naIdToken: idToken,
  //     timestamp: timestamp,
  //     requestId: requestId,
  //     naCountry: userInfo.country,
  //     naBirthday: userInfo.birthday,
  //     language: userInfo.language,
  //   });
  //   const splatoonTokenResponse = await fetch(
  //     `https://api-lp1.znc.srv.nintendo.net/v1/Account/Login?${qs}`,
  //     {
  //       headers,
  //     }
  //   );
  //   const splatoonToken = await splatoonTokenResponse.json();
  //   console.log(splatoonToken);

  return userInfo;

  //   console.log("/v2/Game/GetWebServiceToken", userId);
  //   const {
  //     data: {
  //       result: { accessToken: splatoonAccessToken },
  //     },
  //   } = await fetch(
  //     `https://api-lp1.znc.srv.nintendo.net/v2/Game/GetWebServiceToken`,
  //     {
  //       parameter: {
  //         id: 5741031244955648,
  //         f: login_app.f,
  //         registrationToken: login_app.p1,
  //         timestamp: login_app.p2,
  //         requestId: login_app.p3,
  //       },
  //       headers: {
  //         Authorization: `Bearer ${splatoonToken}`,
  //       },
  //     }
  //   );

  //   console.log("app.splatoon2.nintendo.net", userId);
  //   const r = await axios.get(
  //     `https://app.splatoon2.nintendo.net/?lang=${userLang}`,
  //     {
  //       headers: {
  //         "X-IsAppAnalyticsOptedIn": "false",
  //         Accept:
  //           "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  //         "Accept-Encoding": "gzip,deflate",
  //         "X-GameWebToken": splatoonAccessToken,
  //         "Accept-Language": userLang,
  //         "X-IsAnalyticsOptedIn": "false",
  //         "User-Agent":
  //           "Mozilla/5.0 (Linux; Android 7.1.2; Pixel Build/NJH47D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/59.0.3071.125 Mobile Safari/537.36",
  //         "X-Requested-With": "com.nintendo.znca",
  //       },
  //     }
  //   );
  //   const re = /iksm_session=([a-f0-9]+);/;
  //   let iksmSession: string = "";
  //   for (const h of r.headers["set-cookie"] as string[]) {
  //     if (re.test(h)) {
  //       const rr = re.exec(h);
  //       if (!rr) throw new Error("解析Cookie出错");
  //       iksmSession = rr[1];
  //     }
  //   }
  //   if (!iksmSession) {
  //     throw new Error("获取Cookie失败");
  //   }
  //   return iksmSession;
};

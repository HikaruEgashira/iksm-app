export const splatnetUrl = `https://app.splatoon2.nintendo.net`;
export const clientId = "71b963c1b7b6d119";
export const nsoappVersion = "1.13.2";
export const userAgent = `iksm/${nsoappVersion} iksm-chan Android`;
export const customURLScheme = `npf${clientId}`;
export const redirectURL = `${customURLScheme}://auth`;
export const scope = "openid user user.birthday user.mii user.screenName";
export const acountAuthorizeURI =
  "https://accounts.nintendo.com/connect/1.0.0/authorize";
export const acountSessionTokenURI =
  "https://accounts.nintendo.com/connect/1.0.0/api/session_token";
export const acountAccessTokenURI =
  "https://accounts.nintendo.com/connect/1.0.0/api/token";
export const acountMeURI = "https://api.accounts.nintendo.com/2.0.0/users/me";
export const splatoonTokenURI =
  "https://api-lp1.znc.srv.nintendo.net/v1/Account/Login";
export const splatoonAccessTokenURI =
  "https://api-lp1.znc.srv.nintendo.net/v2/Game/GetWebServiceToken";

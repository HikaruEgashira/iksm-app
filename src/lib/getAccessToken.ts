import * as constants from "~/lib/config";

export const getAccessToken = async (sessionToken: string) =>
  await fetch(constants.acountAccessTokenURI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Platform": "Android",
      "X-ProductVersion": constants.userAgent,
      "User-Agent": constants.userAgent,
      "Content-Length": "439",
      Accept: "application/json",
      Connecton: "Keep-Alive",
    },
    body: JSON.stringify({
      client_id: constants.clientId,
      session_token: sessionToken,
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer-session-token",
    }),
  });

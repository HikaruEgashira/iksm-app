import * as constants from "../config";
import { ErrorResponse } from "../types";

export type SuccessResponse = { accessToken: string; idToken: string };

export const getAccessToken = async (
  sessionToken: string
): Promise<ErrorResponse | SuccessResponse> => {
  const options: RequestInit = {
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
  };
  const rowAccessResponse = await fetch(
    constants.acountAccessTokenURI,
    options
  );
  const { access_token: accessToken, id_token: idToken } =
    await rowAccessResponse.json();
  return { accessToken, idToken };
};

import * as constants from "~/lib/config";
import { ErrorResponse } from "./types";

export type SuccessResponse = { access_token: string; id_token: string };

export const getAccessToken = async (
  sessionToken: string
): Promise<ErrorResponse | SuccessResponse> => {
  const options = {
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
  const accessResponse = await fetch(constants.acountAccessTokenURI, options);
  const accessJson = await accessResponse.json();
  return accessJson;
};

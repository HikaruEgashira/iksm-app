import Url from "url-parse";
import * as constants from "./config";

type Params = {
  client_id: string;
  session_token_code: string;
  session_token_code_verifier: string;
};

const parseUrl = (str: string): Record<string, string> => {
  const query = new Url(str).hash.slice(1);
  return Url.qs.parse(query) as Record<string, string>;
};
export const getSessionTokenParam = (
  url: string,
  sessionTokenCodeVerifier: string
): Params => {
  const object = parseUrl(url);

  return {
    client_id: constants.clientId,
    session_token_code: object["session_token_code"],
    session_token_code_verifier: sessionTokenCodeVerifier,
  };
};

export async function getSessionToken(
  url: string,
  sessionTokenCodeVerifier: string
) {
  const apiUrl = constants.acountSessionTokenURI;
  const bodyJson = getSessionTokenParam(url, sessionTokenCodeVerifier);
  const body = JSON.stringify(bodyJson);
  const headers = {
    "Content-Type": "application/json",
    "X-Platform": "Android",
    "X-ProductVersion": constants.userAgent,
    "User-Agent": constants.userAgent,
  };
  return await fetch(apiUrl, {
    method: "POST",
    body,
    headers,
  });
}

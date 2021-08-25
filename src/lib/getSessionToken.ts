import Url from "url-parse";
import * as constants from "./config";
import { ErrorResponse } from "~/lib/types";

export type SuccessResponse = { session_token: string };

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

export const getSessionToken = async (
  url: string,
  sessionTokenCodeVerifier: string
): Promise<ErrorResponse | SuccessResponse> => {
  const apiUrl = constants.acountSessionTokenURI;
  const bodyJson = getSessionTokenParam(url, sessionTokenCodeVerifier);
  const body = JSON.stringify(bodyJson);
  const headers = {
    "Content-Type": "application/json",
    "X-Platform": "Android",
    "X-ProductVersion": constants.userAgent,
    "User-Agent": constants.userAgent,
  };
  const options = {
    method: "POST",
    body,
    headers,
  };
  const sessoinResponse = await fetch(apiUrl, options);
  const sessionJson = await sessoinResponse.json();
  return sessionJson;
};

import { userAgent } from "~/lib/config";
import { ErrorResponse } from "./types";

interface SuccessResponse {
  login_nso: { f: string };
  login_app: { f: string; p1: string; p2: string; p3: string };
}

const getHash = async (
  idToken: string,
  timestamp: string
): Promise<ErrorResponse | { hash: string }> => {
  const apiUrl = `https://elifessler.com/s2s/api/gen2`;
  const hashResponse = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "User-Agent": userAgent,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      naIdToken: idToken,
      timestamp: timestamp,
    }),
  });
  const hashJson = await hashResponse.json();
  return hashJson;
};

export const callFlapg = async (
  idToken: string,
  guid: string,
  timestamp: string,
  iid: "nso" | "app"
): Promise<ErrorResponse | SuccessResponse> => {
  const apiUrl = "https://flapg.com/ika2/api/login?public";
  const hashJson = await getHash(idToken, timestamp);
  if ("error" in hashJson) {
    return hashJson;
  }

  const flapgResponse = await fetch(apiUrl, {
    headers: {
      "User-Agent": userAgent,
      "x-token": idToken,
      "x-time": timestamp,
      "x-guid": guid,
      "x-hash": hashJson.hash,
      "x-ver": "2",
      "x-iid": iid,
    },
  });
  const flapg = await flapgResponse.json();
  return flapg;
};

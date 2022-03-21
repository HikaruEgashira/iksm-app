import { getNsoappVersion } from "../nsoapp";
import { ErrorResponse } from "../types";

export type SuccessResponse = {
  result: { f: string; p1: string; p2: string; p3: string };
};

const getHash = async (
  idToken: string,
  timestamp: string
): Promise<ErrorResponse | { hash: string }> => {
  const apiUrl = `https://elifessler.com/s2s/api/gen2`;

  const nsoappVersion = await getNsoappVersion();
  const userAgent = `iksm/${nsoappVersion} iksm-chan Android`;
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

/**
 * Passes in headers to the flapg API (Android emulator) and fetches the response.
 */
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

  const nsoappVersion = await getNsoappVersion();
  const userAgent = `iksm/${nsoappVersion} iksm-chan Android`;

  const flapgResponse = await fetch(apiUrl, {
    headers: {
      "User-Agent": userAgent,
      "x-token": idToken,
      "x-time": timestamp,
      "x-guid": guid,
      "x-hash": hashJson.hash,
      "x-ver": "3",
      "x-iid": iid,
    },
  });
  const flapg = await flapgResponse.json();
  return flapg;
};

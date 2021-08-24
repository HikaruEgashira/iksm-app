import { randomBytes } from "crypto";
import { userAgent } from "~/lib/config";

const getHash = async (idToken: string, timestamp: string) => {
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
  const { hash } = await hashResponse.json();
  return hash;
};

export const callFlapg = async (
  idToken: string,
  guid: string,
  timestamp: string
): Promise<{
  login_nso: { f: string };
  login_app: { f: string; p1: string; p2: string; p3: string };
}> => {
  const apiUrl = "https://flapg.com/ika2/api/login?public";
  const hash = await getHash(idToken, timestamp);
  const iid = randomBytes(4).toString("hex");
  const flapgResponse = await fetch(apiUrl, {
    headers: {
      "User-Agent": userAgent,
      "x-token": idToken,
      "x-time": timestamp,
      "x-guid": guid,
      "x-hash": hash,
      "x-ver": "2",
      "x-iid": iid,
    },
  });
  const flapg = await flapgResponse.json();
  console.log("[flapg]", flapg);

  return flapg;
};

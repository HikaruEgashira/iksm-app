import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionToken } from "~/lib/getSessionToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const body = JSON.parse(req.body);
  const url = body.url;
  const sessionTokenCodeVerifier = body.sessionTokenCodeVerifier;
  if (!url || !sessionTokenCodeVerifier) {
    return res.status(400).send("url & sessionTokenCodeVerifier is required");
  }

  const sessionResult = await getSessionToken(url, sessionTokenCodeVerifier);
  const sessionJson = await sessionResult.json();
  if (sessionJson.error) {
    return res.status(400).json(sessionJson);
  }

  res.json(sessionJson);
}

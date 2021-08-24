import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionToken } from "~/lib/getSessionToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const body = JSON.parse(req.body);

  console.info(req.method, req.url);
  Object.keys(body).map((key) => console.info(`${key}: ${body[key]}`));

  const url = body.url;
  const sessionTokenCodeVerifier = body.sessionTokenCodeVerifier;
  if (!url || !sessionTokenCodeVerifier) {
    return res.status(404).send("404 Not Found");
  }
  const result = await getSessionToken(url, sessionTokenCodeVerifier);
  const sessionToken = await result.json();

  if (sessionToken.error) {
    return res.status(400).json(sessionToken);
  }

  res.json(sessionToken);
}

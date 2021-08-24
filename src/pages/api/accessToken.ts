import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken } from "~/lib/getAccessToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const body = JSON.parse(req.body);
  const sessionToken = body.sessionToken;
  if (!sessionToken) {
    return res.status(400).send("sessionToken is required");
  }

  const accessTokenResult = await getAccessToken(sessionToken);
  const accessTokenJson = await accessTokenResult.json();
  if (accessTokenJson.error) {
    return res.status(400).json(accessTokenJson);
  }

  res.json(accessTokenJson);
}

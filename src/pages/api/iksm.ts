import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie } from "~/lib/getCookie";

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

  const cookie = await getCookie(sessionToken, "ja-JP");
  //   const accessTokenJson = await accessTokenResult.json();
  //   if (accessTokenJson.error) {
  //     return res.status(400).json(accessTokenJson);
  //   }

  res.json(JSON.stringify(cookie));
}

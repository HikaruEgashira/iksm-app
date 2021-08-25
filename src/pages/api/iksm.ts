import type { NextApiRequest, NextApiResponse } from "next";
import { getCookie, SuccessResponse } from "~/lib/getCookie";
import { jsonParse } from "~/lib/jsonParse";
import { ErrorResponse } from "~/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const body = jsonParse<{ sessionToken: string }>(req.body);
  if ("error" in body) {
    return res.status(400).json(body);
  }
  const sessionToken = body.sessionToken;
  if (!sessionToken) {
    return res.status(400).json({ error: "sessionToken is required" });
  }

  const cookie = await getCookie(sessionToken, "ja-JP");
  if ("error" in cookie) {
    return res.status(400).json(cookie);
  }

  res.json(cookie);
}

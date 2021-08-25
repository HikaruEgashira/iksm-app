import type { NextApiRequest, NextApiResponse } from "next";
import { getAccessToken, SuccessResponse } from "~/lib/getAccessToken";
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

  const accessTokenResult = await getAccessToken(sessionToken);
  if ("error" in accessTokenResult) {
    return res.status(400).json(accessTokenResult);
  }

  res.json(accessTokenResult);
}

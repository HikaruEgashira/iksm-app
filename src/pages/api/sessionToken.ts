import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionToken, SuccessResponse } from "~/lib/iksm/getSessionToken";
import { jsonParse } from "~/lib/jsonParse";
import { ErrorResponse } from "~/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const body = jsonParse<{ url: string; sessionTokenCodeVerifier: string }>(
    req.body
  );
  if ("error" in body) {
    return res.status(400).json(body);
  }
  const url = body.url;
  const sessionTokenCodeVerifier = body.sessionTokenCodeVerifier;
  if (!url || !sessionTokenCodeVerifier) {
    return res
      .status(400)
      .json({ error: "url & sessionTokenCodeVerifier is required" });
  }

  const sessionResult = await getSessionToken(url, sessionTokenCodeVerifier);
  if ("error" in sessionResult) {
    return res.status(400).json(sessionResult);
  }

  res.json(sessionResult);
}

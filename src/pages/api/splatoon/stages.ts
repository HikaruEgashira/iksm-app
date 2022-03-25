import type { NextApiRequest, NextApiResponse } from "next";
import { getStages, SuccessResponse } from "~/lib/splatoon/getStages";
import { ErrorResponse } from "~/lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  const iksmSession = req.query.iksm_session.toString();
  if (!iksmSession) {
    return res.status(400).json({ error: "iksmSession is required" });
  }

  const records = await getStages(iksmSession);
  if ("error" in records) {
    return res.status(400).json(records);
  }

  res.json(records);
}

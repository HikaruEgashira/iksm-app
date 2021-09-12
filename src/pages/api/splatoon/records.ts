import type { NextApiRequest, NextApiResponse } from "next";
import { jsonParse } from "~/lib/jsonParse";
import { getRecords, SuccessResponse } from "~/lib/splatoon/getRecords";
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

  const records = await getRecords(iksmSession);
  if ("error" in records) {
    return res.status(400).json(records);
  }

  res.json(records);
}

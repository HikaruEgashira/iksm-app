import type { NextApiRequest, NextApiResponse } from "next";
import swagger from "../../../swagger.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json(swagger);
}

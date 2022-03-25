import type { NextApiRequest, NextApiResponse } from "next";
import ical from "ical-generator";
import type { ErrorResponse } from "~/lib/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/ja";

dayjs.locale("ja");
dayjs.extend(utc);

type SuccessResponse = string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  const calendar = ical({ name: "my first iCal" });
  const start = dayjs("2022-04-01T09:00:00+09:00");
  calendar.createEvent({
    start,
    end: start.add(1, "hour"),
    summary: "Example Event",
    description: "It works ;)",
    location: "my room",
    url: "http://sebbo.net/",
  });

  const result = calendar.toString();
  res.send(result);
}

import type { NextApiRequest, NextApiResponse } from "next";
import ical from "ical-generator";
import type { ErrorResponse } from "~/lib/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getCookie } from "~/lib/iksm/getCookie";
import { getSchedules } from "~/lib/splatoon/getSchedules";
import pMemoize from "p-memoize";

const mGetCookie = pMemoize(getCookie);
const mGetSchedules = pMemoize(getSchedules);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

type SuccessResponse = string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  const sessionToken = process.env.session_token;
  if (!sessionToken) {
    return res.status(400).json({ error: "session_token is required" });
  }

  const cookie = await mGetCookie(sessionToken, "ja-JP");
  if ("error" in cookie) {
    return res.status(400).json(cookie);
  }

  const iksmSession = cookie.iksmSession;
  const schedules = await mGetSchedules(iksmSession);
  if ("error" in schedules || "message" in schedules) {
    return res.status(400).json(schedules);
  }

  const rules = ["splat_zones"];
  const calendar = ical({
    name: "スプラトゥーン2",
    timezone: "Asia/Tokyo",
    prodId: {
      company: "hikae",
      product: "iksm-chan",
      language: "JA",
    },
    events: schedules.gachi
      .filter((schedule) => rules.includes(schedule.rule.key))
      .map((schedule) => ({
        start: dayjs(schedule.start_time * 1000).tz(),
        end: dayjs(schedule.end_time * 1000).tz(),
        summary: `${schedule.stage_a.name} ${schedule.stage_b.name}`,
      })),
  });

  res.setHeader(
    "Cache-Control",
    "s-maxage=10800, stale-while-revalidate=75600"
  );
  res.send(calendar.toString());
}

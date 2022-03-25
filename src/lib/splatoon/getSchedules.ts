import { splatnetUrl } from "../config";
import { ErrorResponse } from "../types";

const API_URL = `${splatnetUrl}/api/schedules`;

interface Stage {
  image: string;
  name: string;
  id: string;
}

interface Schedule {
  start_time: number;
  end_time: number;
  rule: {
    key: string;
  };
  id: number;
  stage_a: Stage;
  game_mode: Object;
  stage_b: Stage;
}

interface RecordResponse {
  gachi: Schedule[];
  league: Schedule[];
  regular: Schedule[];
}

export type SuccessResponse = RecordResponse;

export const getSchedules = async (
  iksm_session: string
): Promise<SuccessResponse | ErrorResponse> => {
  try {
    return await fetch(API_URL, {
      headers: {
        cookie: `iksm_session=${iksm_session}`,
      },
    }).then((res) => res.json());
  } catch (error) {
    return {
      error: JSON.parse(JSON.stringify(error)).message,
    };
  }
};

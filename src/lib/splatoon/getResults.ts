import { splatnetUrl } from "../config";
import { ErrorResponse } from "../types";
import { Results } from "@splatoon-stats/types";

const API_URL = `${splatnetUrl}/api/results`;

export type SuccessResponse = Results;

export const getResults = async (
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

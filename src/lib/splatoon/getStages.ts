import { splatnetUrl } from "../config";
import { ErrorResponse } from "../types";

const API_URL = `${splatnetUrl}/api/data/stages`;

interface StagesResponse {}

export type SuccessResponse = StagesResponse;

export const getStages = async (
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

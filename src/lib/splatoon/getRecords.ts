import { splatnetUrl } from "../config";
import { ErrorResponse } from "../types";

const API_URL = `${splatnetUrl}/api/records`;

interface StageInfo {
  id: string;
  name: string;
  image: string;
}

interface WeaponInfo {
  id: string;
  name: string;
  image: string;
  special: {
    id: string;
    image_a: string;
    image_b: string;
  };
  sub: {
    id: string;
    image_a: string;
    image_b: string;
  };
}

interface RecordResponse {
  records: {
    weapon_stats: Record<
      string,
      {
        weapon: WeaponInfo;
      }
    >;
    stage_stats: Record<
      string,
      {
        stage: StageInfo;
      }
    >;
  };
}

export type SuccessResponse = RecordResponse;

export const getRecords = async (
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

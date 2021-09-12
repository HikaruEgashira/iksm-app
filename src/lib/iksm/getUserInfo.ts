import * as constants from "../config";
import { ErrorResponse } from "../types";

export interface SuccessResponse {
  country: string;
  birthday: string;
  language: string;
}

export const getUserInfo = async (
  accessToken: string
): Promise<ErrorResponse | SuccessResponse> => {
  const url = constants.acountMeURI;
  const options: RequestInit = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const userInfoResponse = await fetch(url, options);
  const userInfo = await userInfoResponse.json();
  return userInfo;
};

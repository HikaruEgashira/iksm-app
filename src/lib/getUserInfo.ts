import * as constants from "~/lib/config";
import { ErrorResponse } from "./types";

type SuccessResponse = any;

export const getUserInfo = async (
  accessToken: string
): Promise<ErrorResponse | SuccessResponse> => {
  const url = constants.acountMeURI;
  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const userInfoResponse = await fetch(url, options);
  const userInfo = await userInfoResponse.json();
  return userInfo;
};

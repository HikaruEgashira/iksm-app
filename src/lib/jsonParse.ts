import { ErrorResponse } from "./types";

export const jsonParse = <T = Record<string, any>>(
  v: any
): ErrorResponse | T => {
  try {
    return JSON.parse(v);
  } catch (error) {
    return { error: "failed to parse json" };
  }
};

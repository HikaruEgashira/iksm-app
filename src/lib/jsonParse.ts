import { ErrorResponse } from "./types";

export const jsonParse = <T = Record<string, any>>(
  v: any
): ErrorResponse | T => {
  if (typeof v !== "object") {
    return { error: "not object value cannot parse json" };
  } else {
    try {
      return JSON.parse(v);
    } catch (error) {
      return { error: "failed to parse json" };
    }
  }
};

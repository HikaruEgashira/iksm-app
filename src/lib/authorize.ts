import { clientId, redirectURL, scope } from "./config";
import * as crypto from "crypto";
import base64url from "base64url";

const generateRandom = (length: number) => {
  return base64url(crypto.randomBytes(length));
};

const calculateChallenge = (codeVerifier: crypto.BinaryLike) => {
  const hash = crypto.createHash("sha256");
  hash.update(codeVerifier);
  const codeChallenge = base64url(hash.digest());
  return codeChallenge;
};

const getGenerateAuthenticationParams = () => {
  const state = generateRandom(36);
  const sessionTokenCodeVerifier = generateRandom(32);
  const sessionTokenCodeChallenge = calculateChallenge(
    sessionTokenCodeVerifier
  );

  return {
    state,
    sessionTokenCodeVerifier,
    sessionTokenCodeChallenge,
  };
};

export const parseHash = (hash: string) => {
  if (hash[0] === "#") {
    hash = hash.slice(1);
  }
  let out: Record<string, string> = {};
  for (let [key, value] of hash.split("&").map((i) => i.split("="))) {
    out[key] = decodeURIComponent(value);
  }
  return out;
};

export const authorize = async () => {
  const url = "https://accounts.nintendo.com/connect/1.0.0/authorize";
  const { sessionTokenCodeChallenge, sessionTokenCodeVerifier, state } =
    getGenerateAuthenticationParams();
  const qs = new URLSearchParams({
    state: state,
    redirect_uri: redirectURL,
    client_id: clientId,
    scope,
    response_type: "session_token_code",
    session_token_code_challenge: sessionTokenCodeChallenge,
    session_token_code_challenge_method: "S256",
    theme: "login_form",
  });
  return { url: `${url}?${qs}`, sessionTokenCodeVerifier };
};

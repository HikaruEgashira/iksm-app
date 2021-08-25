/* eslint-disable @next/next/no-css-tags */
import { Icon } from "@iconify/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState, ChangeEvent } from "react";
import {
  useSessionStorage,
  useLocalStorage,
  useCopyToClipboard,
} from "react-use";
import Toast from "light-toast";

import { Nav } from "~/components/nav";
import { Footer } from "~/components/footer";
import { authorize } from "~/lib/authorize";

type Props = {
  q: string | null;
  url: string;
  sessionTokenCodeVerifier: string;
};

const Home: NextPage<Props> = ({ q, url, sessionTokenCodeVerifier }) => {
  const [text, setText] = useState(q ?? "");
  const [sessionToken, setSessionToken] =
    useSessionStorage<string>("session_token");
  const [iksmSession, setIksmSession] = useLocalStorage<string>("iksm_session");

  const [state, copyToClipboard] = useCopyToClipboard();

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setText(value);
  };

  const submit = async (url: string) => {
    Toast.loading("解析中");
    const sessionOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify({ url, sessionTokenCodeVerifier }),
    };
    const rowSessionResponse = await fetch(`api/sessionToken`, sessionOptions);
    const sessionResponse = await rowSessionResponse.json();
    const sessionToken = sessionResponse["session_token"];

    if (rowSessionResponse.ok) {
      setSessionToken(sessionToken);
    } else {
      Toast.fail(sessionToken.error);
    }

    const iksmOption: RequestInit = {
      method: "POST",
      body: JSON.stringify({ sessionToken }),
    };
    const rowIksmResponse = await fetch(`api/iksm`, iksmOption);
    const iksmResponse = await rowIksmResponse.json();

    Toast.hide();

    if (rowIksmResponse.ok) {
      setIksmSession(iksmResponse["iksmSession"]);
    } else {
      Toast.fail(iksmResponse.error);
    }
  };

  return (
    <div
      data-theme="cyberpunk"
      className="min-h-screen bg-base-200 font-ika flex flex-col"
    >
      <Head>
        <title>iksm-chan</title>
      </Head>

      <Nav />

      <main className="p-5 container mx-auto">
        <div className="grid gap-4 mx-auto">
          <label className="label">
            <span className="label-text text-2xl">
              みぎのページにある、「このヒトにする」のリンクをイカ↓のフォームにはりつけろ
            </span>
            <button className="btn font-inkling text-2xl">
              <a href={url} target="_blank" rel="noreferrer">
                click
              </a>
            </button>
          </label>
          <input
            className={`input input-bordered`}
            type="text"
            value={text}
            onChange={onChangeInput}
          />
          <button
            className="btn btn-primary"
            disabled={text === ""}
            onClick={() => submit(text)}
          >
            get iksm →
          </button>
          {/* <div className="stat w-full">
            <div className="stat-title">session_token</div>
            <div className="stat-value truncate">{sessionToken}</div>
            <button
              className="stat-figure btn btn-circle btn-outline"
              onClick={() => copyToClipboard(sessionToken)}
            >
              {state.value === sessionToken ? (
                <Icon icon="akar-icons:check" />
              ) : (
                <Icon icon="akar-icons:clipboard" />
              )}
            </button>
          </div> */}

          {iksmSession && (
            <div className="stat w-full">
              <div className="stat-title">iksm_session</div>
              <div className="stat-value truncate">{iksmSession}</div>
              <button
                className="stat-figure btn btn-circle btn-outline"
                onClick={() => copyToClipboard(iksmSession)}
              >
                {state.value === iksmSession ? (
                  <Icon icon="akar-icons:check" />
                ) : (
                  <Icon icon="akar-icons:clipboard" />
                )}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const q = ctx.params?.q?.toString() ?? null;
  const { url, sessionTokenCodeVerifier } = await authorize();
  return {
    props: {
      q,
      url,
      sessionTokenCodeVerifier,
    },
  };
};

export default Home;

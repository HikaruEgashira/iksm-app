import { Icon } from "@iconify/react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useState, ChangeEvent } from "react";
import { useLocalStorage, useCopyToClipboard } from "react-use";
import Toast from "light-toast";
import { Nav } from "~/components/nav";
import { Footer } from "~/components/footer";
import { authorize } from "~/lib/iksm/authorize";
import * as constants from "~/lib/config";
import { SuccessResponse as Records } from "~/lib/splatoon/getRecords";
import { Results } from "@splatoon-stats/types";

type Props = {
  q: string | null;
  url: string;
  sessionTokenCodeVerifier: string;
};

const Home: NextPage<Props> = ({ q, url, sessionTokenCodeVerifier }) => {
  const [text, setText] = useState(q ?? "");
  const [sessionToken, setSessionToken] =
    useLocalStorage<string>("session_token");
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

  const renew = async () => {
    Toast.loading("セッションを更新中");
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
    Toast.hide();
  };

  const records = async () => {
    const rowRecords = await fetch(
      `/api/splatoon/records?iksm_session=${iksmSession}`
    );
    const records: Records = await rowRecords.json();
    console.log(records);
    Toast.success("ok!");
  };
  const results = async () => {
    const rowResults = await fetch(
      `/api/splatoon/results?iksm_session=${iksmSession}`
    );
    const results: Results = await rowResults.json();
    console.log(results);
    Toast.success("ok!");
  };

  return (
    <main
      data-theme="cyberpunk"
      className="min-h-screen bg-base-200 font-ika flex flex-col"
    >
      <Head>
        <title>iksm-chan</title>
      </Head>

      <Nav />

      <div className="p-5 container mx-auto grid gap-4">
        <label className="label">
          <span className="label-text text-2xl mr-2">
            みぎのページにある、「このヒトにする」のリンクをイカ↓のフォームにはりつけろ！
          </span>
          <button className="btn btn-accent font-inkling text-2xl">
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

        <div className="stat w-full">
          <div className="stat-title">
            iksm_session
            {sessionToken && (
              <button
                className="btn btn-primary btn-xs btn-outline ml-4"
                onClick={renew}
              >
                renew
              </button>
            )}
          </div>
          <div className="stat-value truncate">{iksmSession}</div>
          {iksmSession && (
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
          )}
        </div>

        <h2 className="text-2xl">how to use?</h2>
        <div className="flex gap-4">
          <button className="btn">
            <a
              href={constants.splatnetUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              access splanet
            </a>
          </button>
          <button className="btn">
            <a
              href="https://splatool.net/analytics/"
              target="_blank"
              rel="noopener noreferrer"
            >
              analytics
            </a>
          </button>
          <button className="btn">
            <a
              href="https://splatool.net/records/"
              target="_blank"
              rel="noopener noreferrer"
            >
              records
            </a>
          </button>
        </div>
        {iksmSession && (
          <>
            <h2 className="text-2xl">console</h2>
            <div className="flex gap-4">
              <button className="btn" onClick={records}>
                call records
              </button>
              <button className="btn" onClick={results}>
                call results
              </button>
            </div>
          </>
        )}
      </div>
      <Footer className="mt-auto" />
    </main>
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

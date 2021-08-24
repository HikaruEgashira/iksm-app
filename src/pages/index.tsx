import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState, ChangeEvent } from "react";
import { useSessionStorage, useLocalStorage } from "react-use";
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
  const [accessToken, setAccessToken] = useLocalStorage<string>("access_token");

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setText(value);
  };

  const submit = async (url: string) => {
    const sessionTokenBody = JSON.stringify({ url, sessionTokenCodeVerifier });
    const sessionTokenResponse = await fetch(`api/sessionToken`, {
      method: "POST",
      body: sessionTokenBody,
    });
    const sessionTokenJson = await sessionTokenResponse.json();
    const sessionToken = sessionTokenJson["session_token"];
    setSessionToken(sessionToken);

    const iksmBody = JSON.stringify({ sessionToken });
    const iksmResponse = await fetch(`api/iksm`, {
      method: "POST",
      body: iksmBody,
    });
    const iksmJson = await iksmResponse.json();
    console.log(iksmJson);

    // const accessTokenResponse = await fetch(`api/accessToken`, {
    //   method: "POST",
    //   body: accessTokenBody,
    // });
    // const accessTokenJson = await accessTokenResponse.json();
    // setAccessToken(accessTokenJson["access_token"]);
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Head>
        <title>iksm app | Home</title>
        <meta name="description" content="perfect syllabus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-4 py-10 text-center">
        <div className="container grid gap-4 xs:w-full sm:w-xl lg:w-5xl mx-auto">
          <label className="label">
            <span className="label-text">
              右のページに行き、「この人にする」のリンクを下のフォームに貼り付ける
            </span>
            <a href={url} target="_blank" rel="noreferrer">
              url
            </a>
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
            view
          </button>
          <p
            className="w-full overflow-hidden overflow-ellipsis"
            key="sessionToken"
          >
            {sessionToken}
          </p>
          <p
            className="w-full overflow-hidden overflow-ellipsis"
            key="accessToken"
          >
            {accessToken}
          </p>
        </div>
      </main>
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

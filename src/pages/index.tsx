import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState, ChangeEvent } from "react";
import { authorize } from "~/lib/authorize";

type Props = {
  q: string | null;
  url: string;
  sessionTokenCodeVerifier: string;
};

const Home: NextPage<Props> = ({ q, url, sessionTokenCodeVerifier }) => {
  const [text, setText] = useState(q ?? "");

  const onChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;

    setText(value);
  };

  const submit = async (url: string) => {
    const body = JSON.stringify({ url, sessionTokenCodeVerifier });
    const res = await fetch(`api/sessionToken`, {
      method: "POST",
      body,
    });
    console.log(res);
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

import Head from "next/head";
import { Nav } from "./nav";

type Props = {
  message: string;
};

export const Error = ({ message }: Props) => (
  <div className="min-h-screen bg-base-200 flex flex-col">
    <Head>
      <title>えらー</title>
    </Head>

    <main className="px-4 py-2 ">
      <Nav title="えらー" />
      <div className="alert alert-error max-w-xl mx-auto my-10">
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            ></path>
          </svg>
          <label>{message}</label>
        </div>
      </div>
    </main>
  </div>
);

import { Icon } from "@iconify/react";

type Props = {
  className?: string;
};

export const Nav = ({ className }: Props) => (
  <div
    className={`navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box ${className}`}
  >
    <div className="flex-1 px-2 mx-2">
      <span className="text-lg font-bold font-inkling text-3xl">
        iksm-chan.
      </span>
    </div>
    <div className="flex-none px-2 mx-2">
      <div className="flex items-stretch">
        <a className="btn btn-ghost btn-sm text-2xl" href="api-docs">
          <Icon icon="heroicons-solid:document-text" />
          <span className="hidden">API docs</span>
        </a>
        <a
          className="btn btn-ghost btn-sm text-2xl"
          href="https://github.com/HikaruEgashira/iksm-app"
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon="el:github" />
          <span className="hidden">GitHub</span>
        </a>
      </div>
    </div>
  </div>
);

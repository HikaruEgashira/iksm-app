type Props = {
  className?: string;
};

export const Footer = ({ className }: Props) => (
  <footer
    className={`p-10 footer bg-neutral text-neutral-content ${className}`}
  >
    <div>
      <p className="font-inkling text-7xl">hikae.</p>
      <p>
        HikaeTech
        <br />
        Copyright 2021 HikaruEgashira
      </p>
    </div>
    <div>
      <span className="footer-title">このサービスについて</span>
      <a className="link link-hover">つかいかた</a>
    </div>
    <div>
      <span className="footer-title">せいしゃくしゃ</span>
      <a className="link link-hover" href="https://egahika.dev/">
        About me
      </a>
      <a
        className="link link-hover"
        href="https://hikaetech.vercel.app/5a8bcf01cbf34e55a9b2d388d1f9c638"
        target="_blank"
        rel="noreferrer"
      >
        Contact
      </a>
    </div>
    <div>
      <span className="footer-title">Legal</span>
      <a className="link link-hover">Terms of use</a>
      <a className="link link-hover">Privacy policy</a>
      {/* <a className="link link-hover">Cookie policy</a> */}
    </div>
  </footer>
);

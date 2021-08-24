interface Props {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const Nav = ({ title, right, left }: Props) => (
  <>
    <div className="my-10 mx-auto max-w-5xl flex place-items-center">
      {left}
      <h1 className="text-lg font-extrabold">{title}</h1>
      {right}
    </div>
  </>
);

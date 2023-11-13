import { type PropsWithChildren } from "react";

type PtagPropsType = PropsWithChildren & {
  selected?: boolean;
};

const Ptag = ({ children, selected }: PtagPropsType) => {
  let decoration = "";

  if (selected) {
    decoration = "underline font-bold";
  }

  return (
    <p
      className={`flex h-10 w-full items-center justify-start overflow-hidden truncate text-ellipsis whitespace-nowrap ${decoration}`}
    >
      {children}
    </p>
  );
};
export default Ptag;

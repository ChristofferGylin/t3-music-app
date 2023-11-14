import { type PropsWithChildren } from "react";

type PtagPropsType = PropsWithChildren & {
  selected?: boolean;
  twClasses?: string;
};

const Ptag = ({ children, selected, twClasses = "flex" }: PtagPropsType) => {
  if (selected) {
    twClasses += " underline font-bold ";
  }

  return (
    <p
      className={` h-10 w-full items-center justify-start overflow-hidden truncate text-ellipsis whitespace-nowrap sm:text-sm ${twClasses}`}
    >
      {children}
    </p>
  );
};
export default Ptag;

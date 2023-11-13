import { type PropsWithChildren } from "react";

const Ptag = ({ children }: PropsWithChildren) => {
  return (
    <p className="flex h-10 w-full items-center justify-start overflow-hidden truncate whitespace-nowrap">
      {children}
    </p>
  );
};
export default Ptag;

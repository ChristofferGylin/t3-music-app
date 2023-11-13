import { type PropsWithChildren } from "react";

const Ptag = ({ children }: PropsWithChildren) => {
  return <p className="flex items-center justify-start">{children}</p>;
};
export default Ptag;

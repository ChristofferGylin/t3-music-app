import { PropsWithChildren } from "react";
import Header from "./Header";

const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-[calc(100vh)] w-full bg-slate-700 pt-14">{children}</div>
  );
};

export default Wrapper;

import { PropsWithChildren } from "react";

const SideContainer = ({ children }: PropsWithChildren) => {
  return <ul className="flex h-full w-24 flex-col bg-slate-800">{children}</ul>;
};

export default SideContainer;

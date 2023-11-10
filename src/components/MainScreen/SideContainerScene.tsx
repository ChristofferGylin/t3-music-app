import { type PropsWithChildren } from "react";

const SideContainerScene = ({ children }: PropsWithChildren) => {
  return <ul className="flex w-24 flex-col bg-slate-800">{children}</ul>;
};

export default SideContainerScene;

import { type PropsWithChildren } from "react";

const TextBlock = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export default TextBlock;

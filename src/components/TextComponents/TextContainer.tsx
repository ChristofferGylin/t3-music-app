import { type PropsWithChildren } from "react";

const TextContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="m-10 flex w-5/6 max-w-[800px] flex-col gap-12 md:w-4/5 lg:w-3/4 xl:w-2/3">
      {children}
    </div>
  );
};

export default TextContainer;

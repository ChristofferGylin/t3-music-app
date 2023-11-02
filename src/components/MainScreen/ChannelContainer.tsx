import { PropsWithChildren, MutableRefObject } from "react";

type InnerContainerProps = PropsWithChildren & {
  scrollRef: MutableRefObject<HTMLUListElement | null>;
  scrollControlled?: boolean;
};

const ChannelContainer = ({ children }: PropsWithChildren) => {
  return (
    <ul className="flex h-full w-full items-center gap-x-1 pl-1 pt-1">
      {children}
    </ul>
  );
};

export default ChannelContainer;

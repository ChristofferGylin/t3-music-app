import { PropsWithChildren, MutableRefObject } from "react";

type InnerContainerProps = PropsWithChildren & {
  scrollRef: MutableRefObject<HTMLUListElement | null>;
  scrollControlled?: boolean;
};

const InnerContainer = ({
  children,
  scrollRef,
  scrollControlled,
}: InnerContainerProps) => {
  const styles = "flex items-center gap-x-1 h-16 w-full pl-1";

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    if (scrollRef.current?.scrollLeft) {
      console.log("handleScroll e:", e);
      scrollRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  if (scrollControlled)
    return (
      <ul ref={scrollRef} className={styles}>
        {children}
      </ul>
    );

  return (
    <ul onScroll={handleScroll} className={styles}>
      {children}
    </ul>
  );
};

export default InnerContainer;

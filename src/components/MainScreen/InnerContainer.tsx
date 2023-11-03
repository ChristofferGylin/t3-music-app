import { PropsWithChildren } from "react";

const InnerContainer = ({ children }: PropsWithChildren) => {
  const styles = "flex items-center gap-x-1 h-16 w-full pl-1";

  return <ul className={styles}>{children}</ul>;
};

export default InnerContainer;

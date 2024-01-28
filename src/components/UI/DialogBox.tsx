import { type PropsWithChildren } from "react";

type DialogBoxProps = PropsWithChildren & {
  classes?: string;
};

const DialogBox = ({ children, classes = "" }: DialogBoxProps) => {
  return (
    <div
      className={`rounded border border-slate-100/10 bg-slate-800 p-4 text-slate-300 shadow-lg shadow-slate-800/50 ${classes}`}
    >
      {children}
    </div>
  );
};

export default DialogBox;

import { PropsWithChildren } from "react";

type ModalScreenProps = PropsWithChildren & {
  close: () => void;
  callback: () => void;
};

const DialogBox = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded bg-slate-800 p-4 text-slate-300 shadow-lg shadow-slate-800/50">
      {children}
    </div>
  );
};

export default DialogBox;

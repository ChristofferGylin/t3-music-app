import { PropsWithChildren } from "react";

type ModalScreenProps = PropsWithChildren & {
  close: () => void;
};

const ModalScreen = ({ children, close }: ModalScreenProps) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.currentTarget === e.target) {
      close();
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-slate-900/10 backdrop-blur-sm"
    >
      {children}
    </div>
  );
};

export default ModalScreen;

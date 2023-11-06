type DialogButtonProps = {
  title: string;
  callback: () => void;
};

const DialogButton = ({ title, callback }: DialogButtonProps) => {
  return (
    <button
      className="rounded border border-slate-500 bg-slate-700 px-4 py-2 text-lg text-slate-300 hover:bg-slate-700/60 hover:text-slate-200"
      onClick={callback}
    >
      {title}
    </button>
  );
};

export default DialogButton;

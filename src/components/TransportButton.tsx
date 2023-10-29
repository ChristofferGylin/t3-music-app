import { type IconType } from "react-icons/lib/esm/iconBase";

type TransportButtonProps = {
  Icon: IconType;
  callback: () => void;
  state: boolean;
};

const TransportButton = ({ Icon, callback, state }: TransportButtonProps) => {
  let iconColor = "fill-slate-300";

  if (state) {
    iconColor = "fill-green-400";
  }

  return (
    <button
      className="rounded border border-slate-500 bg-slate-700 px-4 py-2 hover:bg-slate-700/60"
      onClick={callback}
    >
      <Icon className={`text-2xl ${iconColor}`} />
    </button>
  );
};

export default TransportButton;

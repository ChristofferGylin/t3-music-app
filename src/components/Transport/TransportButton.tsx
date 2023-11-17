import { type IconType } from "react-icons/lib/esm/iconBase";

type TransportButtonProps = {
  Icon: IconType;
  callback: () => void;
  state: boolean;
};

const TransportButton = ({ Icon, callback, state }: TransportButtonProps) => {
  let iconColor = "fill-slate-300 group-hover:fill-slate-200";

  if (state) {
    iconColor = "fill-green-400";
  }

  return (
    <button
      className="group flex aspect-[3/2] h-8 items-center justify-center rounded border border-slate-500 bg-slate-700 hover:bg-slate-700/60 sm:h-9 md:h-10"
      onClick={callback}
    >
      <Icon className={`text-lg sm:text-xl md:text-2xl ${iconColor}`} />
    </button>
  );
};

export default TransportButton;

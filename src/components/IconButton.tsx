import { type IconType } from "react-icons/lib/esm/iconBase";

type IconButtonProps = {
  Icon: IconType;
  callback: () => void;
  state: boolean;
};

const IconButton = ({ Icon, callback, state }: IconButtonProps) => {
  let iconColor = "fill-slate-300 hover:fill-slate-200";

  if (state) {
    iconColor = "fill-green-400";
  }

  return (
    <button className="px-4 py-2" onClick={callback}>
      <Icon className={`text-2xl ${iconColor}`} />
    </button>
  );
};

export default IconButton;

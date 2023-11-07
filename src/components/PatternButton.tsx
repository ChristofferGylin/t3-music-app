import { type IconType } from "react-icons/lib/esm/iconBase";

type PatternButtonProps = {
  Icon: IconType;
  callback: () => void;
  state?: boolean;
  size?: string;
};

const PatternButton = ({
  Icon,
  callback,
  state = false,
  size = "",
}: PatternButtonProps) => {
  let iconColor = "fill-slate-300 group-hover:fill-slate-200";

  if (state) {
    iconColor = "fill-green-400";
  }

  return (
    <button
      className={`group flex aspect-square h-6 items-center justify-center rounded border border-slate-500 bg-slate-700 hover:bg-slate-700/60 `}
      onClick={callback}
    >
      <Icon className={`${size} ${iconColor}`} />
    </button>
  );
};

export default PatternButton;

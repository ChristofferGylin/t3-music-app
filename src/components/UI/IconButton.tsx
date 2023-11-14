import { type IconType } from "react-icons/lib/esm/iconBase";

type IconButtonProps = {
  Icon: IconType;
  callback: () => void;
  state?: boolean;
  align?: "left" | "right" | "center";
  size?: string;
  disabled?: boolean;
  loading?: boolean;
};

const IconButton = ({
  Icon,
  callback,
  state = false,
  align,
  size = "text-2xl",
  disabled = false,
  loading = false,
}: IconButtonProps) => {
  let iconColor =
    "fill-slate-300 hover:fill-slate-200 stroke-slate-300 hover:stroke-slate-200 text-slate-300 hover:text-slate-200";

  let aligntment = "";

  if (align) {
    switch (align) {
      case "left":
        aligntment = "justify-self-start";
        break;
      case "right":
        aligntment = "justify-self-end";
        break;
      case "left":
        aligntment = "justify-self-center";
        break;
    }
  }

  if (state) {
    iconColor = "fill-green-400 stroke-green-400 text-green-400";
  }

  let animation = "";

  if (loading) {
    animation = "animate-pulse";
  }
  return (
    <button
      disabled={disabled}
      className={`relative p-2 ${aligntment}`}
      onClick={callback}
    >
      <Icon className={`${size} ${iconColor} ${animation}`} />
    </button>
  );
};

export default IconButton;

import { type IconType } from "react-icons/lib/esm/iconBase";

type IconButtonProps = {
  Icon: IconType;
  callback: () => void;
  state?: boolean;
  align?: "left" | "right" | "center";
};

const IconButton = ({
  Icon,
  callback,
  state = false,
  align,
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

  return (
    <button className={`px-4 py-2 ${aligntment}`} onClick={callback}>
      <Icon className={`text-2xl ${iconColor}`} />
    </button>
  );
};

export default IconButton;

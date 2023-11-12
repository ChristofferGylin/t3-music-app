import Link from "next/link";
import { type IconType } from "react-icons/lib/esm/iconBase";

type MenuItemProps = {
  title: string;
  callback?: () => void;
  link?: string;
  Icon?: IconType;
  iconSize?: string;
};

const MenuItem = ({
  title,
  callback,
  link,
  Icon,
  iconSize = "text-lg",
}: MenuItemProps) => {
  const innerStyling =
    "flex justify-start items-center w-full text-slate-300 hover:text-slate-200 p-2";

  const outerStyling = "w-full border-b border-slate-500 last:border-b-0";

  if (callback) {
    if (Icon) {
      return (
        <li className={outerStyling}>
          <button className={innerStyling} onClick={callback}>
            <div className="w-7">
              <Icon className={`${iconSize}`} />
            </div>
            {title}
          </button>
        </li>
      );
    } else {
      return (
        <li className={outerStyling}>
          <button className={innerStyling} onClick={callback}>
            {title}
          </button>
        </li>
      );
    }
  }

  if (link) {
    if (Icon) {
      return (
        <li className={outerStyling}>
          <Link className={innerStyling} href={link}>
            <div className="w-14 bg-red-300">
              <Icon className={`${iconSize}`} />
            </div>

            {title}
          </Link>
        </li>
      );
    } else {
      return (
        <li className={outerStyling}>
          <Link className={innerStyling} href={link}>
            {title}
          </Link>
        </li>
      );
    }
  }

  return <></>;
};

export default MenuItem;

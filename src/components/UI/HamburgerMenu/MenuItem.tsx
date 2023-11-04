import Link from "next/link";

type MenuItemProps = {
  title: string;
  callback?: () => void;
  link?: string;
};

const MenuItem = ({ title, callback, link }: MenuItemProps) => {
  const innerStyling =
    "flex justify-start items-center w-full text-slate-300 hover:text-slate-200  p-2";

  const outerStyling = "w-full border-b border-slate-500 last:border-b-0";

  if (callback) {
    return (
      <li className={outerStyling}>
        <button className={innerStyling} onClick={callback}>
          {title}
        </button>
      </li>
    );
  }

  if (link) {
    return (
      <li className={outerStyling}>
        <Link className={innerStyling} href={link}>
          {title}
        </Link>
      </li>
    );
  }

  return <></>;
};

export default MenuItem;

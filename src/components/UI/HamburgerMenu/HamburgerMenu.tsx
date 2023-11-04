import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "../../IconButton";
import { useState } from "react";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((old) => !old);
  };

  return (
    <div className="relative justify-self-end">
      {menuOpen ? (
        <IconButton Icon={AiOutlineClose} callback={toggleMenu} />
      ) : (
        <IconButton Icon={RxHamburgerMenu} callback={toggleMenu} />
      )}
      {menuOpen && (
        <ul className="absolute -right-1 top-12  w-48 rounded-b border-x border-b border-slate-600 bg-slate-800/50 drop-shadow-lg">
          <MenuItem
            title="Save"
            callback={() => {
              console.log("save");
            }}
          />
          <MenuItem title="Open project" callback={signOut} />
          <MenuItem
            title="New project"
            callback={() => {
              console.log("New project");
            }}
          />
          <MenuItem title="Settings" callback={signOut} />
          <MenuItem title="Sign out" callback={signOut} />
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;

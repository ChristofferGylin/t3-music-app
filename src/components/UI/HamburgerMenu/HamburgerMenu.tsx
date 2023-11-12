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
    <div className="relative">
      {menuOpen ? (
        <IconButton
          Icon={AiOutlineClose}
          callback={toggleMenu}
          size="text-lg sm:text-2xl"
        />
      ) : (
        <IconButton
          Icon={RxHamburgerMenu}
          callback={toggleMenu}
          size="text-lg sm:text-2xl"
        />
      )}
      {menuOpen && (
        <ul className="absolute -right-1 top-10 w-48 rounded-bl  border-x border-b border-slate-600 bg-slate-800/50 drop-shadow-lg sm:top-11 md:top-12">
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

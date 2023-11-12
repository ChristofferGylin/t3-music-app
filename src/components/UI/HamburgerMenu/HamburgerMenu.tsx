import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import IconButton from "../../IconButton";
import { useState, useContext } from "react";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { type ContextType, AppContext } from "~/context";
import { GiBrainDump } from "react-icons/gi";
import { VscSignOut } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { TfiSave } from "react-icons/tfi";

const HamburgerMenu = () => {
  const {
    scenes,
    scenesState,
    instruments,
    instrumentsState,
    loop,
    loopState,
  } = useContext(AppContext) as ContextType;
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
            title="New"
            Icon={HiOutlineDocumentAdd}
            callback={() => {
              console.log("New project");
            }}
          />
          <MenuItem
            title="Open"
            Icon={AiOutlineFolderOpen}
            callback={signOut}
          />
          <MenuItem
            title="Save"
            Icon={TfiSave}
            iconSize="text-sm"
            callback={() => {
              console.log("save");
            }}
          />
          <MenuItem
            title="Settings"
            Icon={FiSettings}
            callback={() => console.log("settings")}
          />
          <MenuItem
            title="Console Dump"
            Icon={GiBrainDump}
            callback={() => {
              console.log("scenes:", scenes);
              console.log("scenesState:", scenesState);
              console.log("instruments:", instruments);
              console.log("instrumentsState:", instrumentsState);
              console.log("loopState:", loopState);
              console.log("loop:", loop);
            }}
          />
          <MenuItem title="Sign out" Icon={VscSignOut} callback={signOut} />
        </ul>
      )}
    </div>
  );
};

export default HamburgerMenu;

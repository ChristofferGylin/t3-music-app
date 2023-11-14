import { RxHamburgerMenu } from "react-icons/rx";
import IconButton from "../UI/IconButton";
import { useState, useContext } from "react";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { type ContextType, AppContext } from "~/context";
import { GiBrainDump } from "react-icons/gi";
import { VscSignOut } from "react-icons/vsc";
import { FiSettings } from "react-icons/fi";
import { FaMusic, FaEye, FaUsers } from "react-icons/fa";
import { AiOutlineClose, AiOutlineFolderOpen } from "react-icons/ai";
import { CgPiano } from "react-icons/cg";

const AdminHamburgerMenu = () => {
  const {
    scenes,
    scenesState,
    instruments,
    instrumentsState,
    loop,
    loopState,
  } = useContext(AppContext)! as ContextType;
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
        <ul className="absolute -right-1 top-10 w-48 rounded-bl  border-x border-b border-slate-600 bg-slate-800/50 drop-shadow-lg backdrop-blur-md sm:top-11 md:top-12">
          <MenuItem
            title="Overview"
            Icon={FaEye}
            link="/admin"
            toggle={toggleMenu}
          />
          <MenuItem
            title="Users"
            Icon={FaUsers}
            link="/admin/users"
            toggle={toggleMenu}
          />
          <MenuItem
            title="Projects"
            Icon={AiOutlineFolderOpen}
            link="/admin/projects"
            toggle={toggleMenu}
          />
          <MenuItem
            title="Instruments"
            Icon={CgPiano}
            link="/admin/instruments"
            toggle={toggleMenu}
          />
          <MenuItem
            title="Settings"
            Icon={FiSettings}
            callback={() => console.log("settings")}
            toggle={toggleMenu}
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
            toggle={toggleMenu}
          />
          <MenuItem
            title="Back to studio"
            Icon={FaMusic}
            iconSize="text-sm"
            link="/studio/projects"
            toggle={toggleMenu}
          />
          <MenuItem
            title="Sign out"
            Icon={VscSignOut}
            toggle={toggleMenu}
            callback={signOut}
          />
        </ul>
      )}
    </div>
  );
};

export default AdminHamburgerMenu;

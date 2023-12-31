import BackButton from "../UI/BackButton";
import Link from "next/link";
import AdminHamburgerMenu from "../HamburgerMenu/AdminHamburgerMenu";

const AdminHeader = () => {
  const linkClasses =
    "text-slate-300 visited:text-slate-300 hover:text-slate-200 decoration-transparent hover:decoration-slate-200 underline underline-offset-8 transition-all duration-150";
  return (
    <>
      <BackButton root={["/admin"]} />
      <ul className="col-start-2 hidden  items-center justify-center gap-8 text-base xs:flex sm:gap-10 sm:text-lg md:gap-12 md:text-xl">
        <li key={"topMenuLinkOverViewKey"}>
          <Link className={linkClasses} href={"/admin"}>
            OVERVIEW
          </Link>
        </li>
        <li key={"topMenuLinkUsersKey"}>
          <Link className={linkClasses} href={"/admin/users"}>
            USERS
          </Link>
        </li>
        <li key={"topMenuLinkProjectsKey"}>
          <Link className={linkClasses} href={"/admin/projects"}>
            PROJECTS
          </Link>
        </li>
        <li key={"topMenuLinkInstrumentsKey"}>
          <Link className={linkClasses} href={"/admin/instruments"}>
            INSTRUMENTS
          </Link>
        </li>
      </ul>
      <div className="col-start-3 flex w-full justify-end justify-self-end">
        <AdminHamburgerMenu />
      </div>
    </>
  );
};

export default AdminHeader;

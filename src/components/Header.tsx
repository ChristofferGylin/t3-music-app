import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StudioHeader from "./StudioHeader";
import LandingHeader from "./LandingHeader";
import AdminHeader from "./AdminHeader";

const Empty = () => <></>;

const Header = () => {
  const router = useRouter();
  const [useHeader, setUseHeader] = useState("none");
  let HeaderComponent = () => {
    return <></>;
  };

  useEffect(() => {
    if (router.pathname.startsWith("/studio")) {
      setUseHeader("studio");
    } else if (router.pathname.startsWith("/admin")) {
      setUseHeader("admin");
    } else {
      setUseHeader("landing");
    }
  }, [router]);

  switch (useHeader) {
    case "studio":
      HeaderComponent = StudioHeader;
      break;
    case "landing":
      HeaderComponent = LandingHeader;
      break;
    case "admin":
      HeaderComponent = AdminHeader;
      break;
    default:
      HeaderComponent = Empty;
  }

  return (
    <nav className="fixed right-0 top-0 z-40 grid h-11 w-full grid-cols-[4rem_1fr_4rem] items-center bg-slate-900 p-1 sm:h-12  sm:grid-cols-[5rem_1fr_5rem] md:h-14">
      <HeaderComponent />
    </nav>
  );
};

export default Header;

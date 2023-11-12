import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StudioHeader from "./StudioHeader";
import LandingHeader from "./LandingHeader";

const Header = () => {
  const router = useRouter();
  const [useHeader, setUseHeader] = useState("none");
  let HeaderComponent = () => {
    return <></>;
  };

  useEffect(() => {
    if (router.pathname.startsWith("/studio")) {
      setUseHeader("studio");
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
    default:
      HeaderComponent = () => <></>;
  }

  return (
    <nav className="fixed right-0 top-0 grid h-11 w-full grid-cols-3 items-center bg-slate-900 p-1 sm:h-12 md:h-14">
      <HeaderComponent />
    </nav>
  );
};

export default Header;

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StudioHeader from "./StudioHeader";

const Header = () => {
  const router = useRouter();
  const [studioHeader, setStudioHeader] = useState(false);

  useEffect(() => {
    if (router.pathname.startsWith("/studio")) {
      setStudioHeader(true);
    } else {
      setStudioHeader(false);
    }
  }, [router]);

  if (studioHeader) {
    return <StudioHeader />;
  }
  return <></>;
};

export default Header;

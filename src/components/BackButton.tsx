import { BiArrowBack } from "react-icons/bi";
import IconButton from "./IconButton";
import { useRouter } from "next/router";

const BackButton = ({ root = "/" }: { root?: string | string[] }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  if (typeof root === "string") {
    return (
      <>
        {router.pathname !== root && !router.pathname.startsWith("/loader") && (
          <IconButton
            callback={handleBack}
            Icon={BiArrowBack}
            align="left"
            size="text-lg sm:text-2xl"
          />
        )}
      </>
    );
  } else {
    return (
      <>
        {!root.filter((path) => path === router.pathname).length &&
          !router.pathname.startsWith("/loader") && (
            <IconButton
              callback={handleBack}
              Icon={BiArrowBack}
              align="left"
              size="text-lg sm:text-2xl"
            />
          )}
      </>
    );
  }
};

export default BackButton;

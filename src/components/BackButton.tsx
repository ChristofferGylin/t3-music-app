import { BiArrowBack } from "react-icons/bi";
import IconButton from "./IconButton";
import { useRouter } from "next/router";

const BackButton = ({ root = "/" }: { root?: string }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      {router.pathname !== root && (
        <IconButton
          callback={handleBack}
          Icon={BiArrowBack}
          align="left"
          size="text-lg sm:text-2xl"
        />
      )}
    </>
  );
};

export default BackButton;

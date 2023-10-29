import Link from "next/link";
import { deflateRaw } from "zlib";

const Page2 = () => {
  return (
    <div>
      <div>Page 2</div>
      <div>
        {" "}
        <Link href={"/"}>Go Home</Link>
      </div>
    </div>
  );
};

export default Page2;

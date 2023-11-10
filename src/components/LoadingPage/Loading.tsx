import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 text-lg text-slate-300">
        <AiOutlineLoading className="animate-spin fill-slate-300 text-4xl" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

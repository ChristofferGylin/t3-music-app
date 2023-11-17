import { useContext, useState } from "react";
import { Transport } from "tone";
import { type ContextType, AppContext } from "~/context";

const Bpm = () => {
  const { project, setBpm } = useContext(AppContext)! as ContextType;
  const [inputValue, setInputValue] = useState(`${project.bpm.toFixed(1)}`);

  const handleBpm = () => {
    const bpm = +inputValue;
    Transport.bpm.value = bpm;
    setBpm(bpm);
    setInputValue(bpm.toFixed(1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleBpm();
  };

  return (
    <form
      className="flex h-8 items-center rounded border border-slate-500 bg-slate-700 pl-5 focus-within:bg-slate-700/60 hover:bg-slate-700/60 sm:h-9 md:h-10"
      onBlur={handleBpm}
      onSubmit={handleSubmit}
    >
      <div className="font-bold">BPM: </div>
      <input
        step={0.1}
        className="flex w-16 items-center justify-center bg-transparent text-center outline-none"
        type="number"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
    </form>
  );
};

export default Bpm;

import { useContext, useState, useRef } from "react";
import { Transport } from "tone";
import { type ContextType, AppContext } from "~/context";

const Bpm = () => {
  const { project, setBpm } = useContext(AppContext)! as ContextType;
  const [inputValue, setInputValue] = useState(`${project.bpm.toFixed(1)}`);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBpm = () => {
    const input = +inputValue;
    let bpm: number;

    if (input < 20) {
      bpm = 20;
    } else if (input > 1000) {
      bpm = 1000;
    } else {
      bpm = input;
    }

    Transport.bpm.value = bpm;
    setBpm(bpm);
    setInputValue(bpm.toFixed(1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleBpm();
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      className="group flex aspect-[3/2] h-8 flex-col items-center rounded border border-slate-500 bg-slate-700 focus-within:bg-slate-700/60 focus-within:text-slate-200 hover:bg-slate-700/60 sm:h-9 md:h-10"
      onBlur={handleBpm}
      onSubmit={handleSubmit}
      onClick={handleClick}
    >
      <div className="text-xxxs flex w-full justify-center font-bold group-hover:text-slate-200 sm:text-xxs">
        BPM
      </div>
      <input
        ref={inputRef}
        step={0.1}
        className="flex w-16 items-center justify-center bg-transparent text-center text-xs outline-none group-hover:text-slate-200 sm:text-sm md:text-base"
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

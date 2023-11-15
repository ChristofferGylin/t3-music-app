import ReactSlider from "react-slider";

const VolumeSlider = ({
  callback,
  valueState,
}: {
  callback: (val: number) => void;
  valueState: number;
}) => {
  const handleChange = (val: number | number[]) => {
    if (typeof val === "number") {
      callback(val);
    }
  };

  return (
    <ReactSlider
      className="h-full w-3/4 self-center justify-self-center rounded border border-slate-600/30 bg-slate-800/40 shadow-inner"
      orientation="vertical"
      invert
      onChange={handleChange}
      value={valueState}
      step={0.001}
      renderThumb={(props) => (
        <div
          {...props}
          className="z-40 flex aspect-[2/1] w-full cursor-pointer items-center justify-center rounded border border-slate-700 bg-slate-800 shadow"
        >
          <div className="w-full border border-slate-300"></div>
        </div>
      )}
    />
  );
};

export default VolumeSlider;

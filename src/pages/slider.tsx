import ReactSlider from "react-slider";

const Slider = () => {
  return (
    <div className="h-full w-full bg-red-400">
      <ReactSlider
        ariaLabelledby="slider-label"
        className="horizontal-slider"
        thumbClassName="example-thumb"
        trackClassName="example-track"
        invert
      />
    </div>
  );
};

export default Slider;

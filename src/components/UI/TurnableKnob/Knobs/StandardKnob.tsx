import { type MutableRefObject } from "react";

const StandardKnob = ({
  rotation,
  onMouseDown,
  lightRingRef,
}: {
  rotation: string;
  onMouseDown: (e: React.MouseEvent<Element, MouseEvent>) => void;
  lightRingRef: MutableRefObject<SVGCircleElement | null>;
}) => {
  return (
    <svg
      onMouseDown={(e) => {
        onMouseDown(e);
      }}
      id="knob"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 55.27 55.27"
    >
      <defs>
        <linearGradient
          id="New_Gradient_Swatch_11"
          data-name="New Gradient Swatch 11"
          x1="11.96"
          y1="13.61"
          x2="42.78"
          y2="41.18"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#545454" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient
          id="New_Gradient_Swatch_9"
          data-name="New Gradient Swatch 9"
          x1="5.85"
          y1="13.4"
          x2="51.09"
          y2="42.96"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2e2e2e" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient
          id="New_Gradient_Swatch_9-2"
          data-name="New Gradient Swatch 9"
          x1="9.39"
          y1="27.64"
          x2="45.88"
          y2="27.64"
          xlinkHref="#New_Gradient_Swatch_9"
        />
        <linearGradient
          id="New_Gradient_Swatch_8"
          data-name="New Gradient Swatch 8"
          x1="21.11"
          y1="15.81"
          x2="34.76"
          y2="40.54"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#474747" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient
          id="New_Gradient_Swatch_7"
          data-name="New Gradient Swatch 7"
          x1="15.63"
          y1="23.99"
          x2="59.6"
          y2="37.33"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2b2b2b" />
          <stop offset=".25" stopColor="#181818" />
          <stop offset=".52" stopColor="#000" />
        </linearGradient>
        <linearGradient
          id="New_Gradient_Swatch_6"
          data-name="New Gradient Swatch 6"
          x1="27.35"
          y1="13.67"
          x2="27.9"
          y2="40.52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset=".42" stopColor="#070707" />
          <stop offset=".52" stopColor="#020202" />
        </linearGradient>
        <linearGradient
          id="New_Gradient_Swatch_5"
          data-name="New Gradient Swatch 5"
          x1="18.65"
          y1="14.8"
          x2="36.35"
          y2="40.08"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d6d6d6" stopOpacity=".7" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient
          id="New_Gradient_Swatch_9-3"
          data-name="New Gradient Swatch 9"
          x1="1722.17"
          y1="-690.79"
          x2="1758.66"
          y2="-690.79"
          gradientTransform="translate(1746.76 769.83) rotate(-135)"
          xlinkHref="#New_Gradient_Swatch_9"
        />
        <radialGradient
          id="New_Gradient_Swatch_4"
          data-name="New Gradient Swatch 4"
          cx="1740.42"
          cy="-700.53"
          fx="1740.42"
          fy="-700.53"
          r="1.78"
          gradientTransform="translate(1746.76 769.83) rotate(-135)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset=".26" stopColor="#5cff62" />
        </radialGradient>
      </defs>
      <circle
        cx="27.64"
        cy="27.64"
        r="23.11"
        fill="url(#New_Gradient_Swatch_11)"
        strokeWidth="0"
      />
      <path
        d="M27.64,4.52C14.87,4.52,4.52,14.87,4.52,27.64s10.35,23.11,23.11,23.11,23.11-10.35,23.11-23.11S40.4,4.52,27.64,4.52ZM27.64,50.63c-12.68,0-22.99-10.31-22.99-22.99S14.96,4.64,27.64,4.64s22.99,10.31,22.99,22.99-10.31,22.99-22.99,22.99Z"
        fill="url(#New_Gradient_Swatch_9)"
        strokeWidth="0"
      />
      <circle
        cx="27.64"
        cy="27.64"
        r="18.25"
        fill="url(#New_Gradient_Swatch_9-2)"
        strokeWidth="0"
      />
      <path
        d="M27.64,44.91c-9.53,0-17.27-7.75-17.27-17.27s7.75-17.27,17.27-17.27,17.27,7.75,17.27,17.27-7.75,17.27-17.27,17.27Z"
        fill="url(#New_Gradient_Swatch_8)"
        strokeWidth="0"
      />
      <path
        d="M27.64,42.23c-8.05,0-14.6-6.55-14.6-14.6s6.55-14.6,14.6-14.6,14.6,6.55,14.6,14.6-6.55,14.6-14.6,14.6Z"
        fill="url(#New_Gradient_Swatch_7)"
        strokeWidth="0"
      />
      <path
        d="M27.64,13.04c-8.05,0-14.6,6.55-14.6,14.6s6.55,14.6,14.6,14.6,14.6-6.55,14.6-14.6-6.55-14.6-14.6-14.6ZM27.64,41.99c-7.92,0-14.35-6.44-14.35-14.35s6.44-14.35,14.35-14.35,14.35,6.44,14.35,14.35-6.44,14.35-14.35,14.35Z"
        fill="url(#New_Gradient_Swatch_6)"
        strokeWidth="0"
      />
      <path
        d="M27.64,10.36c-9.53,0-17.27,7.75-17.27,17.27s7.75,17.27,17.27,17.27,17.27-7.75,17.27-17.27-7.75-17.27-17.27-17.27ZM27.64,44.67c-9.39,0-17.03-7.64-17.03-17.03s7.64-17.03,17.03-17.03,17.03,7.64,17.03,17.03-7.64,17.03-17.03,17.03Z"
        fill="url(#New_Gradient_Swatch_5)"
        opacity=".67"
        strokeWidth="0"
      />
      <g
        className="turnable-knob"
        style={{
          rotate: rotation,
        }}
      >
        <circle
          cx="27.64"
          cy="27.64"
          r="18.25"
          fill="url(#New_Gradient_Swatch_9-3)"
          opacity="0"
          strokeWidth="0"
        />
        <circle
          cx="20.75"
          cy="34.52"
          r="1.78"
          fill="url(#New_Gradient_Swatch_4)"
          strokeWidth="0"
        />
      </g>
      <path
        d="M55.27,27.64c0,7.4-2.93,14.1-7.68,19.07l-3.21-3.23c3.92-4.12,6.34-9.7,6.34-15.84,0-12.73-10.36-23.09-23.09-23.09S4.55,14.9,4.55,27.64c0,6.14,2.43,11.72,6.34,15.84l-3.21,3.23C2.93,41.73,0,35.04,0,27.64,0,12.4,12.4,0,27.64,0s27.64,12.4,27.64,27.64Z"
        fill="#6c6"
        opacity=".45"
        strokeWidth="0"
      />
      <circle
        style={{ transformOrigin: "50% 50%" }}
        ref={lightRingRef}
        cx="27.64"
        cy="27.64"
        r="25.36"
        fill="none"
        stroke="#45ff6c"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </svg>
  );
};

export default StandardKnob;

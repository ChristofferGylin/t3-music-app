import Image from "next/image";

const NewInstrumentItem = ({
  newInstrument,
  handleClose,
  title,
  text,
  img,
}: {
  newInstrument: () => void;
  handleClose: () => void;
  title: string;
  text: string;
  img: {
    url: string;
    height: number;
    width: number;
  };
}) => {
  return (
    <li className="w-full p-1">
      <button
        onClick={() => {
          newInstrument();
          handleClose();
        }}
        className="w-full rounded border-2 border-transparent p-4 hover:border-slate-500/20"
      >
        <div className="flex w-full flex-col gap-3 text-left">
          <h3 className="text-base uppercase tracking-wider xs:text-lg sm:text-xl lg:text-2xl">
            {title}
          </h3>
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <Image
              src={img.url}
              alt={title}
              width={img.width}
              height={img.height}
              className="w-full md:w-1/2"
            />
            <p className="text-sm font-light tracking-wider xs:text-base lg:text-lg">
              {text}
            </p>
          </div>
        </div>
      </button>
    </li>
  );
};

export default NewInstrumentItem;

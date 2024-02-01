import { useContext, useState } from "react";
import { AppContext, type ContextType } from "~/context";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { api } from "~/utils/api";
import ModalScreen from "../UI/ModalScreen";
import DialogBox from "../UI/DialogBox";
import NewInstrumentItem from "./NewInstrumentItem";

const NewInstrument = () => {
  const [showModal, setShowModal] = useState(false);
  const { newInstrumentDrums, newInstrumentBassic, instruments } = useContext(
    AppContext,
  )! as ContextType;

  if (instruments.current.length === 0 && !showModal) {
    setShowModal(true);
  }

  const defKit = api.instruments.getDrumsKitById.useQuery({
    id: "cloobtmk60000nvxoncyrom50",
  }).data;

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <li key={`newInstrument`} className="h-full">
      {showModal && (
        <ModalScreen close={handleClose}>
          <DialogBox classes="flex flex-col items-center gap-2 h-3/4 w-3/4">
            <h1 className="m-4 border-b border-slate-500 text-lg uppercase xs:text-xl sm:text-2xl lg:text-3xl">
              Add a new instrument
            </h1>
            <ul className="flex w-full flex-col gap-4 overflow-y-auto overflow-x-hidden">
              <NewInstrumentItem
                title="Drums"
                text="Drums is a sample based drum machine filled with classic and contemporary sounds."
                newInstrument={() => {
                  if (defKit) {
                    newInstrumentDrums(defKit);
                  }
                }}
                handleClose={handleClose}
                img={{
                  url: "/images/instruments/drums-screenshot.png",
                  width: 835,
                  height: 328,
                }}
              />
              <NewInstrumentItem
                title="Bassic"
                text="Bassic is a simple one oscillator subtractive synthesizer,
                      perfect for deep basses and piercing leads."
                newInstrument={newInstrumentBassic}
                handleClose={handleClose}
                img={{
                  url: "/images/instruments/bassic-screenshot.png",
                  width: 1063,
                  height: 346,
                }}
              />
            </ul>
          </DialogBox>
        </ModalScreen>
      )}
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className="group flex h-full w-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-2  hover:border-slate-400"
      >
        <AiOutlinePlusCircle
          className={`fill-slate-300 text-2xl group-hover:fill-slate-200`}
        />
      </button>
    </li>
  );
};

export default NewInstrument;

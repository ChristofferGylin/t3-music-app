import { useContext, useState } from "react";
import { AppContext, type ContextType } from "~/context";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { api } from "~/utils/api";
import ModalScreen from "../UI/ModalScreen";
import DialogBox from "../UI/DialogBox";

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
          <DialogBox classes="flex flex-col gap-2 h-3/4 w-3/4 ">
            <h1>Add a new instrument</h1>
            <ul>
              <li key={"newInstrumentDrumsKey"}>
                <button
                  onClick={() => {
                    if (defKit) {
                      newInstrumentDrums(defKit);
                    }
                    handleClose();
                  }}
                >
                  Drums
                </button>
              </li>
              <li key={"newInstrumentBassicKey"}>
                <button
                  onClick={() => {
                    if (defKit) {
                      newInstrumentBassic();
                    }
                    handleClose();
                  }}
                >
                  Bassic
                </button>
              </li>
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

import { useContext } from "react";
import IconButton from "./IconButton";
import { TfiSave } from "react-icons/tfi";
import { type ContextType, AppContext } from "~/context";
import { api } from "~/utils/api";
import MenuItem from "../HamburgerMenu/MenuItem";
import { type InstrumentStateDrumsType } from "~/types/InstrumentStateType";

const SaveButton = ({
  hamburger,
  toggle,
}: {
  hamburger?: boolean;
  toggle?: () => void;
}) => {
  const { instrumentsState, scenesState, project, setSavingState, saving } =
    useContext(AppContext)! as ContextType;

  let disabled = false;

  if (saving) {
    disabled = true;
  }

  const saveToDb = api.project.save.useMutation({
    onSuccess: () => {
      setSavingState(false);
    },
  });

  const handleSave = async () => {
    setSavingState(true);
    const instrumentsJSON = JSON.stringify(instrumentsState);
    const scenesJSON = JSON.stringify(scenesState);

    type KitIds = {
      id: string;
    }[];

    const kitIds: KitIds = [];

    instrumentsState.forEach((inst) => {
      if (inst.modelName === "Drums") {
        const drums = inst as InstrumentStateDrumsType;
        kitIds.push({ id: drums.currentKit });
      }
    });

    await saveToDb.mutateAsync({
      instruments: instrumentsJSON,
      scenes: scenesJSON,
      kits: kitIds,
      project: project,
    });
  };

  if (hamburger && toggle) {
    return (
      <MenuItem
        title="Save"
        Icon={TfiSave}
        iconSize="text-sm"
        callback={handleSave}
        toggle={toggle}
        disabled={disabled}
      />
    );
  }

  if (saving) {
    return (
      <IconButton
        Icon={TfiSave}
        callback={handleSave}
        size="text-md sm:text-lg"
        disabled
        state
        loading
      />
    );
  }

  return (
    <IconButton
      Icon={TfiSave}
      callback={handleSave}
      size="text-md sm:text-lg"
    />
  );
};

export default SaveButton;

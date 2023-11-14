import { useContext } from "react";
import IconButton from "./IconButton";
import { TfiSave } from "react-icons/tfi";
import { type ContextType, AppContext } from "~/context";
import { api } from "~/utils/api";
import MenuItem from "../HamburgerMenu/MenuItem";

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
    console.log("saving");
    setSavingState(true);
    const instrumentsJSON = JSON.stringify(instrumentsState);
    const scenesJSON = JSON.stringify(scenesState);

    const kitIds = instrumentsState.map((inst) => {
      return { id: inst.currentKit };
    });

    await saveToDb.mutateAsync({
      id: project.id,
      instruments: instrumentsJSON,
      scenes: scenesJSON,
      kits: kitIds,
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

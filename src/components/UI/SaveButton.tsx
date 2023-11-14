import { useContext } from "react";
import IconButton from "../IconButton";
import { TfiSave } from "react-icons/tfi";
import { type ContextType, AppContext } from "~/context";
import { api } from "~/utils/api";
import MenuItem from "./HamburgerMenu/MenuItem";

const SaveButton = ({ hamburger }: { hamburger?: boolean }) => {
  const { instrumentsState, scenesState, project } = useContext(
    AppContext,
  )! as ContextType;

  const saveToDb = api.project.save.useMutation();

  const handleSave = async () => {
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

  if (hamburger) {
    return (
      <MenuItem
        title="Save"
        Icon={TfiSave}
        iconSize="text-sm"
        callback={handleSave}
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

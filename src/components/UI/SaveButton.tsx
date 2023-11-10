import { useContext } from "react";
import IconButton from "../IconButton";
import { TfiSave } from "react-icons/tfi";
import { type ContextType, AppContext } from "~/context";
import { api } from "~/utils/api";

const SaveButton = () => {
  const { instrumentsState, scenesState, project } = useContext(
    AppContext,
  ) as ContextType;

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

  return <IconButton Icon={TfiSave} callback={handleSave} />;
};

export default SaveButton;

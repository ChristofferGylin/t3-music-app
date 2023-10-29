import Link from "next/link";
import { Scene } from "~/types/Scene";

type SceneComponentProps = {
  sceneIndex: number;
  scene: Scene;
};

const SceneComponent = ({ sceneIndex, scene }: SceneComponentProps) => {
  return (
    <li key={`scene#${sceneIndex}`} className="p-2">
      <ul className="flex gap-4">
        {scene.patterns.map((pattern, index) => {
          return (
            <li key={`scene#${sceneIndex}-pattern#${index}`}>
              <Link
                href={{
                  pathname: "/editor",
                  query: { instrument: index, scene: sceneIndex },
                }}
              >
                <div className="h-24 w-24 rounded border border-purple-800 bg-purple-600 hover:bg-purple-500"></div>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default SceneComponent;

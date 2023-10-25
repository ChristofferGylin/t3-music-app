import { Volume, Sampler, Player } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import { kits } from "./kits";

export type DrumsType = {
  masterVolume: Volume;
  channels: {
    name: string;
    sampler: Sampler;
    release: Time;
    attack: Time;
    volume: number;
    play: (time?: Time) => void;
  }[];
};

const drums = function (): DrumsType {
  const masterVolume = new Volume(-10).toDestination();
  const channels = kits[0]?.map((kit) => {
    return {
      name: kit.title,
      sampler: new Sampler({
        urls: {
          C3: kit.url,
        },
      }).connect(masterVolume),
      player: new Player(kit.url).toDestination(),
      release: 1,
      attack: 0,
      volume: 0,
      play: function (time?: Time) {
        this.sampler.triggerAttackRelease("C3", this.release, time);
      },
    };
  });

  return {
    masterVolume: new Volume(-10).toDestination(),
    channels: channels || [],
  };
};

export default drums;

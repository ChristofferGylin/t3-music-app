import { type DrumsKit } from "@prisma/client";
import { Volume, Sampler } from "tone";
import { type Time } from "tone/build/esm/core/type/Units";
import type ChannelType from "~/types/ChannelType";
import signalToDb from "~/utils/math/signalToDb";

export type DrumsType = {
  currentStep: number;
  masterVolume: Volume;
  setMasterVolume: (val: number) => void;
  name: string;
  channels: ChannelType[];
  type: "drums";
  modelName: string;
  new: boolean;
};

type KitChannelsType = [{ title: string; url: string }];

const drums = function (masterOut: Volume, kit: DrumsKit): DrumsType {
  const masterVolume = new Volume(0).connect(masterOut);

  const kitChannels = JSON.parse(kit.channels) as KitChannelsType;

  const channels = kitChannels.map((kit) => {
    return {
      name: kit.title,
      sampler: new Sampler({
        urls: {
          C3: kit.url,
        },
      }).connect(masterVolume),
      release: 1,
      attack: 0,
      volume: 0,
      play: function (time?: Time) {
        this.sampler.triggerAttackRelease("C3", this.release, time);
      },
      setVolume: function (val: number) {
        const dBValue = signalToDb(val);

        this.sampler.volume.value = dBValue;
      },
    };
  });

  return {
    currentStep: 0,
    name: "drums",
    masterVolume,
    setMasterVolume: function (val: number) {
      const dBValue = signalToDb(val);

      this.masterVolume.volume.value = dBValue;
    },
    channels: channels || [],
    type: "drums",
    modelName: "Drums",
    new: true,
  };
};

export default drums;

import { type DrumsKit } from "@prisma/client";
import { Volume, Sampler, Player } from "tone";
import { type Time } from "tone/build/esm/core/type/Units";
import type ChannelType from "~/types/ChannelType";

export type DrumsType = {
  currentStep: number;
  masterVolume: Volume;
  name: string;
  channels: ChannelType[];
  type: "drums";
  modelName: string;
  new: boolean;
};

type KitChannelsType = [{ title: string; url: string }];

const drums = function (kit: DrumsKit): DrumsType {
  const masterVolume = new Volume(-10).toDestination();

  const kitChannels = JSON.parse(kit.channels) as KitChannelsType;

  const channels = kitChannels.map((kit) => {
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
    currentStep: 0,
    name: "drums",
    masterVolume: new Volume(-10).toDestination(),
    channels: channels || [],
    type: "drums",
    modelName: "Drums",
    new: true,
  };
};

export default drums;

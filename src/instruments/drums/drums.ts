import { Volume, Sampler, Player } from "tone";
import { Time } from "tone/build/esm/core/type/Units";
import ChannelType from "~/types/ChannelType";

export type DrumsType = {
  currentStep: number;
  masterVolume: Volume;
  name: string;
  channels: ChannelType[];
  type: "drums";
  modelName: string;
};

const drums = function (): DrumsType {
  const defaultKit = [
    {
      title: "Kick",
      url: "./samples/Electro1/1-Kick01.wav",
    },
    {
      title: "Snare 1",
      url: "./samples/Electro1/3-Snr01.wav",
    },
    {
      title: "Snare 2",
      url: "./samples/Electro1/4-Snr02.wav",
    },
    {
      title: "Clap",
      url: "./samples/Electro1/5-Clap01.wav",
    },
    {
      title: "Cl. Hat",
      url: "./samples/Electro1/6-ClHat01.wav",
    },
    {
      title: "Op. Hat",
      url: "./samples/Electro1/7-OpHat01.wav",
    },
    {
      title: "Cymbal",
      url: "./samples/Electro1/8-Cymbal01.wav",
    },
    {
      title: "Tom 1",
      url: "./samples/Electro1/9-Tom01.wav",
    },
    {
      title: "Tom 2",
      url: "./samples/Electro1/10-Tom02.wav",
    },
    {
      title: "Tom 3",
      url: "./samples/Electro1/11-Tom03.wav",
    },
    {
      title: "Tom 4",
      url: "./samples/Electro1/12-Tom04.wav",
    },
  ];
  const masterVolume = new Volume(-10).toDestination();
  const channels = defaultKit.map((kit) => {
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
  };
};

export default drums;

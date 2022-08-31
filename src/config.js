const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.eth;

// General metadata for Ethereum
const namePrefix = "Your Collection";
const symbol = "YC";
const description = "Remember to replace this description";
const baseUri = "ipfs://NewUriToReplace";


// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 1000,
    layersOrder: [
      { name: "Background" },
      { name: "Body" },
      { name: "Clothing" },
      { name: "Accessory" },
      { name: "Hat" },
      { name: "Hands" },
      { name: "Text 1" },
      { name: "Text 2" },
      { name: "Text 3" },
      { name: "Text 4" }
    ],
  },
];

const shuffleLayerConfigurations = false;

const debugLogs = true;

// If the content is a video
const isVideo = true;

const imgExtension = ".mp4";

// Metadatas & images storage
const centralizedStorage = true;

const videoSettings = {
  snapshot: "00:00:22",
  time: "00:00:23",
  audioLayer: 0,
  BG: "black",
  size: "1080x1920",
  hexColor: "0x4aff01",
  similarity: "0.2",
  bend: "0.01"
}

const format = {
  width: 2590,
  height: 2611,
  smoothing: false,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: false,
  brightness: "80%",
  static: false,
  default: "#000000",
};

let extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 5,
  thumbWidth: 50,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 5,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  symbol,
  baseUri,
  description,
  background,
  isVideo,
  centralizedStorage,
  imgExtension,
  videoSettings,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  gif,
  preview_gif,
};

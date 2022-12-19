bgCols = [
  "#FFF5EE", //seashell
  "#fbf6e3", //canvas
  "#E6E0D4", //white coffee
  "#FDDEBD", //butter white
  "#F6FCFA", //white rose
  "#ECECEE", //christmas white
  "#1F201F", //retro black
  "#212122", //ink black
  "#1B1B1B", //eerie black
  "#242124", //raisin black
];

bgNames = [
  "SeaShell",
  "Canvas",
  "White Coffee",
  "Butter White",
  "White Rose",
  "Christmas White",
  "Retro Black",
  "Ink Black",
  "Eerie Black",
  "Raisin Black",
];
//Background color parameters
bgNum = 4//randomInt(0, 5);
bgc = bgCols[bgNum];
bgName = bgNames[bgNum];

//Make a color that always contrasts bgc
calcBgLum = chroma(bgc).luminance();
if (calcBgLum > 0.5) {
  frameCol = 'black'; //black
} else if( calcBgLum < 0.5) {
  frameCol = 'white'; //white
}

//Palettes
//Always include frameCol instead of black or white so our colors don't blend into bgc
const source = [
  "#A6C8CA",
  "#097857",
  "#F1E8D9",
  "#E3CE61",
  "#E35A7E",
  frameCol,
  "#EE692A",
  "#BFCCD4",
  "#217F96",
  "#EBD5D7",
];

const shepard = ["#3D5A80", "#98C1D9", "#E0FBFC", "#FF4D21", "#293241", frameCol];

const toyBlocks = ["#EBB701", "#EA3F23", "#00A2C8", frameCol, "#EAEAEA"];

const mcWoot = ["#ED6A5A", "#636CCE", "#DFB2F4", "#50B386", "#55D6C2", frameCol];

const soft = [
  "#F94144",
  "#F3722C",
  "#F8961E",
  "#F9844A",
  "#F9C74F",
  "#90BE6D",
  "#43AA8B",
  "#4D908E",
  "#577590",
  "#277DA1",
  frameCol,
  "white",
];

const jazzy = [
  frameCol,
  "#005f73",
  "#0a9396",
  "#94d2bd",
  "#e9d8a6",
  "#ee9b00",
  "#ca6702",
  "#bb3e03",
  "#ae2012",
  "#9b2226",
];

const ceramic = [
  "#5B476C",
  "#3581AA",
  "#A54B49",
  "#CED8D3",
  "#72BC9C",
  "#D49B8A",
  "#0096C7",
  frameCol,
];

const oilPastel = [
 '#EF2167',
 '#B8DEEE',
 '#F7E1F1',
 '#2B6C71',
 '#FBFAF6',
 '#050E13',
 '#B6C3BA',
 '#EF7F6B'
]

 const mcNay = [
 '#87966B',
 '#D4816F',
 '#617E94',
 '#DAC3B5',
 '#B8C1D0',
 '#BC7B58',
 '#8B8279',
]

 const oKeefe = [
 '#4F4D5C',
 '#E4CDB3',
 '#833828',
 '#B27362',
 '#D7B4A8',
 '#DBAF64',
 '#9D5F00',
 '#B9BAAB',
 '#414A37',
 '#838D7F',
]

 const flowerMarket = [
 '#4F4D5C',
 '#E4CDB3',
 '#833828',
 '#B27362',
 '#D7B4A8',
 '#DBAF64',
 '#9D5F00',
 '#B9BAAB',
 '#414A37',
 '#838D7F',
]

 const oilPaint = [
 '#844E93',
 '#B197C8',
 '#416368',
 '#3B3F42',
 '#69919B',
 '#90774C',
 '#ECEDE7',
]

 const seaFoam = [
 "#22577a", "#38a3a5", "#57cc99", "#80ed99", "#c7f9cc", "#f2f9e8", "#f9f9f9"
] //credit Wouter Missler

const popper = ["#F5D365", "#E66C64", "#92BCC8", "#4F7C9A", frameCol];

const vint = [
  "#F9F2ED",
  "#3AB0FF",
  "#FFB562",
  "#457543",
  "#F87474",
  "#1F201F"
]

const burn = [
  "#00b4e2",
  "#fd4f92",
  "#ff7b89",
  "#ffa070",
  "#ffd403",

]


const creamsicle = [
  "#FF731D",
  "#FFF7E9",
  "#5F9DF7",
  "#1746A2",
]

const bau = [
  "#0461B8",
  "#F1230D",
  "#FAB304",
  "#E4D6C2",
  "#1D1F22",
]

const bauB = [
  "#E12122",
  "#1D1F22",
  "#30475E",
  "#F7F0DF",
  "#8ED081",
  "#976391"
]

const purp = [
  "#F07DEA",
  "#A460ED",
  "#9FC9F3",
  "#EEEEEE",
  "#1F201F",
  "#A2DE96"
]

const elliot = [
  "#E73542",
  "#F6A026",
  "#2CA8C4",
  "#EE7140",
  "#289C5B",
  "#F5E2CC",
  "#161117"
]

const camp = [
  "#F43F6C",
  "#FCCA39",
  "#54B55B",
  "#9D4E9A",
  "#453D8A",
  "#DEEFEC",
  "#161117"
]

const test = [
  '#564138',
  '#2e86ab',
  '#f6f5ae',
  '#f5f749',
  '#f24236',
  '#ff6b6c',
  '#eb5e28',
  '#c8b8db',
  '#c98686'
]

const test2 = [
  "#e71d36",
  "#af4319",
  "#772014",
  "#3f220f",
  "#19180a",
  "#011627",
  "#41ead4",
  "#fdfffc",
  "#ff9f1c"
]
const test3 = [
  "#adc9ed",
"#de8209",
"#8bfccb",
"#bd6c8f",
"#c9266d",
"#3a5c8a",
"#55cf9a",
"#0f8c56",
"#9c713a",
frameCol,
bgc
]







const pals = [source, shepard, toyBlocks, mcWoot, soft, jazzy, ceramic, oilPastel, mcNay, oKeefe, flowerMarket, oilPaint];

const palNames = [
  "Source",
  "Commander Shepard",
  "Toy Blocks",
  "McWoot",
  "Soft",
  "Jazzy",
  "Ceramic",
  "Oil Pastel",
  "McNay",
  "O'Keefe",
  "Flower Market",
  "Oil Paint"
];

newPals = [
  source,
  bau,
  bauB,
  vint,
  //burn,
  //purp,
  elliot
]

newPalNames = [
  'Source',
  'Bau',
  'BauB',
  'Vint',
  //'Burn',
  //'Purp',
  "Elliot"
]

//Palette parameters
palNum = randomInt(0, newPals.length-1);
pal = newPals[palNum];
palName = newPalNames[palNum];

console.log(palName)

//Setup for the next step
lighterPal = [];
darkerPal = [];
warmerPal = [];
coolerPal = [];

coolTemp = 5000;
warmTemp = 8000;

//Increase color variation by 5x-ing our palette size and making slight adjustments to each copy
for (let i = 0; i < pal.length-1; i++) {
  lighterPal[i] = chroma(pal[i]).brighten(0.35).hex();
  darkerPal[i] = chroma(pal[i]).darken(0.35).hex();
  warmerPal[i] = chroma
    .mix(pal[i], chroma.temperature(coolTemp).hex(), 0.5)
    .saturate()
    .hex();
  coolerPal[i] = chroma
    .mix(pal[i], chroma.temperature(warmTemp).hex(), 0.5)
    .saturate()
    .hex();
}

//Combine palettes and shuffle that full palette
fullPal = [].concat(pal, darkerPal, lighterPal);
truePal = shuff(pal);
hilo = [bgc, frameCol]

//Pass our palette back to the CSS spinner
let root = document.documentElement;
root.style.setProperty("--c1", truePal[0]);
root.style.setProperty("--c2", truePal[1]);
root.style.setProperty("--c3", truePal[2]);
root.style.setProperty("--c4", truePal[3]);

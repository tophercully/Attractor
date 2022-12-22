bgc = "#F6FCFA"
//Make a color that always contrasts bgc
calcBgLum = chroma(bgc).luminance();
if (calcBgLum > 0.5) {
  frameCol = 'black'; //black
} else if( calcBgLum < 0.5) {
  frameCol = 'white'; //white
}
hilo = [bgc, frameCol]

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

const shepard = [
  "#3D5A80", 
  "#98C1D9", 
  "#E0FBFC", 
  "#FF4D21", 
  "#293241", 
  frameCol
];

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

const bau = [
  "#1267b7",
  "#ec3e2b",
  "#f6b81a",
  "#E4D6C2",
  "#1D1F22",
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

const utah = [
  '#004921',
  '#e4703a',
  '#ebb240',
  '#e9b9a9',
  '#fff0e0',
  "#161117"
]

let pureMono = [
  "#ffffff",
  "#efefef",
  "#e6e6e6",
  "#d7d7d7",
  "#bababa",
  "#7f7f7f",
  "#565656",
  "#414141",
  "#000000",
  "#000000"
]



const regulate = [
  '#3F9CD5',
  '#204f6d',
  '#F18937',
  '#e3b592',
  '#F5F5F5',
  '#1F1F1F'
]

newPals = [
  source,
  bau,
  regulate,
  shepard,
  elliot,
  //pureMono,
  utah
]

newPalNames = [
  'Source',
  'Bau',
  'Regulate',
  'Commander Shepard',
  "Elliot",
  //"Achromatic",
  "Utah"
]

//Palette parameters
palNum = randomInt(0, newPals.length-1);
otherPalNum = randomInt(0, newPals.length-1);
pal = newPals[palNum];
otherPal = newPals[otherPalNum];
palName = newPalNames[palNum];

console.log(palName)
truePal = shuff(pal);

//Pass our palette back to the CSS spinner
let root = document.documentElement;
root.style.setProperty("--c1", truePal[0]);
root.style.setProperty("--c2", truePal[1]);
root.style.setProperty("--c3", truePal[2]);
root.style.setProperty("--c4", truePal[3]);

type ConstructorColorsType = {
  [key: string]: string;
  "Alfa Romeo": string;
  AlphaTauri: string;
  Alpine: string;
  "Aston Martin": string;
  Ferrari: string;
  Hass: string;
  McLaren: string;
  Mercedes: string;
  "Red Bull": string;
  Williams: string;
};

const constructorColors: ConstructorColorsType = {
  "Alfa Romeo": "#B93C4E",
  AlphaTauri: "#6A8EA7",
  Alpine: "#4891CC",
  "Aston Martin": "#4E8976",
  Ferrari: "#E5373F",
  Hass: "#B7BABD",
  McLaren: "#E6863B",
  Mercedes: "#86D1BF",
  "Red Bull": "#4570C0",
  Williams: "#62BBD9",
};

export const tagColors: {
  text: ConstructorColorsType;
  background: ConstructorColorsType;
} = {
  text: {
    "Alfa Romeo": "text-[#B93C4E]",
    AlphaTauri: "text-[#6A8EA7]",
    Alpine: "text-[#4891CC]",
    "Aston Martin": "text-[#4E8976]",
    Ferrari: "text-[#E5373F]",
    Hass: "text-[#B7BABD]",
    McLaren: "text-[#E6863B]",
    Mercedes: "text-[#86D1BF]",
    "Red Bull": "text-[#4570C0]",
    Williams: "text-[#62BBD9]",
  },
  background: {
    "Alfa Romeo": "bg-[#f1d8dc]",
    AlphaTauri: "bg-[#e1e8ed]",
    Alpine: "bg-[#dae9f5]",
    "Aston Martin": "bg-[#dce7e4]",
    Ferrari: "bg-[#fad7d9]",
    Hass: "bg-[#f1f1f2]",
    McLaren: "bg-[#fae7d8]",
    Mercedes: "bg-[#e7f6f2]",
    "Red Bull": "bg-[#dae2f2]",
    Williams: "bg-[#e0f1f7]",
  },
};

export const wdcPlotColors: { [key: string]: string } = {
  BOT: constructorColors["Alfa Romeo"],
  ZHO: constructorColors["Alfa Romeo"],
  DEV: constructorColors.AlphaTauri,
  LAW: constructorColors.AlphaTauri,
  RIC: constructorColors.AlphaTauri,
  TSU: constructorColors.AlphaTauri,
  GAS: constructorColors.Alpine,
  OCO: constructorColors.Alpine,
  ALO: constructorColors["Aston Martin"],
  STR: constructorColors["Aston Martin"],
  LEC: constructorColors.Ferrari,
  SAI: constructorColors.Ferrari,
  HUL: constructorColors.Hass,
  MAG: constructorColors.Hass,
  NOR: constructorColors.McLaren,
  PIA: constructorColors.McLaren,
  HAM: constructorColors.Mercedes,
  RUS: constructorColors.Mercedes,
  PER: constructorColors["Red Bull"],
  VER: constructorColors["Red Bull"],
  ALB: constructorColors.Williams,
  SAR: constructorColors.Williams,
};

type ConstructorColorsType = {
  [key: string]: string;
  "Alfa Romeo": string;
  AlphaTauri: string;
  Alpine: string;
  "Aston Martin": string;
  Ferrari: string;
  Haas: string;
  McLaren: string;
  Mercedes: string;
  "Red Bull": string;
  Williams: string;
};

export const constructorColors: ConstructorColorsType = {
  "Alfa Romeo": "#B93C4E",
  AlphaTauri: "#6A8EA7",
  Alpine: "#4891CC",
  "Aston Martin": "#4E8976",
  Ferrari: "#E5373F",
  Haas: "#B7BABD",
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
    "Alfa Romeo": "text-[#822A37]",
    AlphaTauri: "text-[#4A6375]",
    Alpine: "text-[#32668F]",
    "Aston Martin": "text-[#376053]",
    Ferrari: "text-[#E5373F]",
    Haas: "text-[#B7BABD]",
    McLaren: "text-[#E6863B]",
    Mercedes: "text-[#86D1BF]",
    "Red Bull": "text-[#4570C0]",
    Williams: "text-[#62BBD9]",
  },
  // Background colors are the constructorColors with 90% more white
  background: {
    "Alfa Romeo": "bg-[#F8ECED]",
    AlphaTauri: "bg-[#EDEFF1]",
    Alpine: "bg-[#ebf0F4]",
    "Aston Martin": "bg-[#EBEFEE]",
    Ferrari: "bg-[#FCEBEC]",
    Haas: "bg-[#f8f8F8]",
    McLaren: "bg-[#FDF3EB]",
    Mercedes: "bg-[#F3FAF9]",
    "Red Bull": "bg-[#ECF1F9]",
    Williams: "bg-[#EFF8FB]",
  },
};

export const wdcPlotColors: { [key: string]: string } = {
  BOT: tweakColor(constructorColors["Alfa Romeo"]),
  ZHO: constructorColors["Alfa Romeo"],
  DEV: tweakColor(constructorColors.AlphaTauri),
  LAW: tweakColor(constructorColors.AlphaTauri),
  RIC: tweakColor(constructorColors.AlphaTauri),
  TSU: constructorColors.AlphaTauri,
  GAS: constructorColors.Alpine,
  OCO: tweakColor(constructorColors.Alpine),
  ALO: constructorColors["Aston Martin"],
  STR: tweakColor(constructorColors["Aston Martin"]),
  LEC: constructorColors.Ferrari,
  SAI: tweakColor(constructorColors.Ferrari),
  HUL: constructorColors.Haas,
  MAG: tweakColor(constructorColors.Haas),
  NOR: constructorColors.McLaren,
  PIA: tweakColor(constructorColors.McLaren),
  HAM: constructorColors.Mercedes,
  RUS: tweakColor(constructorColors.Mercedes),
  PER: constructorColors["Red Bull"],
  VER: tweakColor(constructorColors["Red Bull"]),
  ALB: constructorColors.Williams,
  SAR: tweakColor(constructorColors.Williams),
};

function tweakColor(hex: string): string {
  const hsl = hexToHsl(hex);
  hsl[2] = hsl[2] - 20;
  return hslToHex(hsl);
}

function hexToHsl(hex: string): [number, number, number] {
  let r: number = 0,
    g: number = 0,
    b: number = 0;

  if (hex.length == 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length == 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number = 0;
  let s: number = 0;
  const l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(hsl: [number, number, number]): string {
  const h = hsl[0];
  let s = hsl[1];
  let l = hsl[2];

  s /= 100;
  l /= 100;

  const c: number = (1 - Math.abs(2 * l - 1)) * s;
  const x: number = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m: number = l - c / 2;
  let r: number = 0;
  let g: number = 0;
  let b: number = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  // Convert RGB to HEX
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  const rgbToHex = (rgb: number): string => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  return `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`;
}

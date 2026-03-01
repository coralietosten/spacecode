
export type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };


export function randomColor() : RGB{
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return {r,g,b}
}

export function complementaryColor(rgb : RGB ) :RGB {
  // calcule la couleur complémentaire
  return {r:255 - rgb["r"],g:255 - rgb["g"],b:255 - rgb["b"]};
}

// Convert RGB {r,g,b} → HSL {h,s,l}
function rgbToHsl({ r, g, b }: RGB) :HSL {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h : number = (max + min) / 2;
  let s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // gris
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, l };
}

// Convert HSL {h,s,l} → RGB {r,g,b}
function hslToRgb({ h, s, l }:HSL) : RGB{
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  h = h % 360;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c / 2;
  let r1, g1, b1;

  if (h < 60) { r1 = c; g1 = x; b1 = 0; }
  else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
  else { r1 = c; g1 = 0; b1 = x; }

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255)
  };
}

// Générer deux couleurs analogues pour une couleur RGB
export function generateAnaloguesRGB(rgb : RGB) : [RGB,RGB] {
  const hsl = rgbToHsl(rgb);
  const analogue1 = hslToRgb({ ...hsl, h: (hsl.h + 30) % 360 });
  const analogue2 = hslToRgb({ ...hsl, h: (hsl.h + 330) % 360 }); // équivalent -30°
  return [analogue1, analogue2];
}



/**
 * Convertit une couleur RGB en HEX
 * @param rgb - objet { r, g, b } avec valeurs 0-255
 * @returns string HEX commençant par #
 */
export function rgbToHex({ r, g, b }: RGB): string {
  // Limite les valeurs entre 0 et 255
  const clamp = (x: number) => Math.max(0, Math.min(255, x));

  const toHex = (x: number) => clamp(x).toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


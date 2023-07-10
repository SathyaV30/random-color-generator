document.addEventListener('DOMContentLoaded', function () {
  updateColor();
});

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if(max == min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [ h, s, l ];
}

function hslToRgb(h, s, l) {
  let r, g, b;

  if(s == 0) {
    r = g = b = l;
  } else {
    function hue2rgb(p, q, t) {
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) ];
}

function applyColorToScreen(color) {
  document.getElementById('body').style.backgroundColor = color;
  document.getElementById('a1').innerText = color;
  var n_match = ntc.name(color);
  document.getElementById("c").innerText = n_match[1];
}

function getRandomColor() {
  let hueRange;

  switch(document.getElementById('color-range').value) {
    case 'reds':
      hueRange = Math.random() > 0.5 ? [0, 0.083] : [0.917, 1];
      break;
    case 'blues':
      hueRange = [0.583, 0.75];
      break;
    case 'greens':
      hueRange = [0.25, 0.417];
      break;
    case 'warm':
      hueRange = [0, 0.25];
      break;
    case 'cool':
      hueRange = [0.25, 0.75];
      break;
    default:
      hueRange = [0, 1]; 
  }

  let hsl = [Math.random() * (hueRange[1] - hueRange[0]) + hueRange[0], 0, 0]; 

  const saturation = document.getElementById('saturation').value / 100; 
  const brightness = document.getElementById('brightness').value / 100; 
  hsl[1] = saturation; 
  hsl[2] = brightness; 
  let finalRgb = hslToRgb(...hsl);

  return rgbToHex(...finalRgb);
}

function updateColor() {
  let newColor = getRandomColor();
  applyColorToScreen(newColor);
}

document.addEventListener('keydown', function (e) {
  if (e.key === ' ') {
    updateColor();
  }
});

document.getElementById('color-range').addEventListener('change', function () {
  updateColor();
});

document.getElementById('saturation').addEventListener('input', function () {
  updateColor();
});

document.getElementById('brightness').addEventListener('input', function () {
  updateColor();
});

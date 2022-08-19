function rgbLuminance (rgbColor) {
  // Reference: https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  const [red, green, blue] = rgbColor.map((color8bit) => {
    const colorSRGB = color8bit / 255
    if (colorSRGB <= 0.03928) {
      return colorSRGB / 12.92
    } else {
      return Math.pow(((colorSRGB + 0.055) / 1.055), 2.4)
    }
  })
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function luminanceRatio (rgb1, rgb2) {
  const luminance1 = rgbLuminance(rgb1);
  const luminance2 = rgbLuminance(rgb2);
  // Reference: https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
  if (luminance1 > luminance2) {
    return (luminance1 + 0.05) / (luminance2 + 0.05)
  } else {
    return (luminance2 + 0.05) / (luminance1 + 0.05)
  }
}

export {
  rgbLuminance,
  luminanceRatio,
}

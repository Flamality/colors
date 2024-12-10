import React, { useState } from "react";
import { ChromePicker } from "react-color";
import CopyBox from "./CopyBox";

export default function ColorPicker() {
  const [color, setColor] = useState("#FFFFFF");

  function handleColorChange(color) {
    setColor(color.hex);
  }

  function getContrastingColor(color) {
    if (color.startsWith("#")) color = color.substring(1);
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return luminance > 0.5 ? "#000000" : "#FFFFFF";
  }
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b };
  }
  function hexToHsl(hex) {
    const { r, g, b } = hexToRgb(hex);
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;
    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    let h = 0;
    if (delta !== 0) {
      if (max === rNorm) {
        h = ((gNorm - bNorm) / delta) % 6;
      } else if (max === gNorm) {
        h = (bNorm - rNorm) / delta + 2;
      } else if (max === bNorm) {
        h = (rNorm - gNorm) / delta + 4;
      }
      h *= 60;
      if (h < 0) h += 360;
    }
    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  return (
    <div className="color-picker-container">
      <div className="color-display" style={{ backgroundColor: color }}>
        <h1 style={{ color: getContrastingColor(color) }}>Color Picker</h1>
        <p style={{ color: getContrastingColor(color) }}>
          <strong>Selected Color</strong>
          <br /> {color}
        </p>
      </div>
      <label>Selected a Color:</label>
      <ChromePicker
        color={color}
        onChange={handleColorChange}
        disableAlpha={true}
      />
      <div className="copy-boxes">
        <CopyBox value={color} text={color} label={"HEX"} />
        <CopyBox
          value={`${hexToRgb(color).r}, ${hexToRgb(color).g}, ${
            hexToRgb(color).b
          }`}
          text={`${hexToRgb(color).r}, ${hexToRgb(color).g}, ${
            hexToRgb(color).b
          }`}
          label={"RGB"}
        />
        <CopyBox
          value={`${hexToHsl(color).h}, ${hexToHsl(color).s}%, ${
            hexToHsl(color).l
          }%`}
          text={`${hexToHsl(color).h}, ${hexToHsl(color).s}%, ${
            hexToHsl(color).l
          }%`}
          label={"HSL"}
        />
      </div>
    </div>
  );
}

import { randomElement } from "./randomElement";

const textureNames = [
  "fabric",
  "grass",
  "concrete",
  "marble",
  "flesh",
  "wood",
  "noodles",
  "flower",
  "bricks",
];

const shapes = [
  /* HTML */ ` <circle cx="512" cy="512" r="512" fill="url(#pattern)" /> `,
  /* HTML */ `
    <rect x="10" y="10" width="1004" height="1004" fill="url(#pattern)" />
  `,
];

export function generateProductImage({
  texture = randomElement(textureNames),
} = {}) {
  return /* HTML */ `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewbox="0 0 1024 1024"
  >
    <defs>
      <pattern
        id="pattern"
        width="1024"
        height="1024"
        patternUnits="userSpaceOnUse"
      >
        <image
          href="textures/${texture}-diffuse.jpg"
          x="0"
          y="0"
          width="1024"
          height="1024"
        />
      </pattern>
    </defs>
    ${randomElement(shapes)}
  </svg>`;
}

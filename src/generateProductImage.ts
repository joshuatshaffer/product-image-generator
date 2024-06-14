import { randomElement } from "./randomElement";

export const textureNames = [
  "fabric",
  "grass",
  "concrete",
  "marble",
  "flesh",
  "wood",
  "noodles",
  "flower",
  "bricks",
] as const;

export type TextureName = (typeof textureNames)[number];

interface ShapeArgs {
  patternId: string;
}

const shapes = {
  ball: ({ patternId }: ShapeArgs) => {
    const linearGradientId = randomId();
    const radialGradientId = randomId();

    return /* HTML */ `
      <defs>
        <linearGradient id="${linearGradientId}">
          <stop
            style="stop-color:#000000;stop-opacity:0"
            offset="0"
            id="stop1548"
          />
          <stop
            style="stop-color:#000000;stop-opacity:0.00380334"
            offset="0.74906671"
            id="stop3464"
          />
          <stop
            style="stop-color:#000000;stop-opacity:0.46965486"
            offset="1"
            id="stop1550"
          />
        </linearGradient>
        <radialGradient
          href="#${linearGradientId}"
          id="${radialGradientId}"
          cx="298.46671"
          cy="433.78925"
          fx="298.46671"
          fy="433.78925"
          r="406.40756"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1.1277109,0.79506189,-0.8168174,1.1585691,339.60432,-390.58626)"
        />
      </defs>
      <circle
        fill="url(#${patternId})"
        id="circle3944"
        cx="515.15753"
        cy="507.07953"
        r="406.40756"
      />
      <circle
        fill="url(#${radialGradientId})"
        stroke="#000"
        stroke-width="3"
        id="path936"
        cx="515.15753"
        cy="507.07953"
        r="406.40756"
      />
    `;
  },
  block: ({ patternId }: ShapeArgs) => /* HTML */ `
    <rect x="10" y="10" width="1004" height="1004" fill="url(#${patternId})" />
  `,
  lamp: ({ patternId }: ShapeArgs) => /* HTML */ `
    <path
      style="fill:url(#${patternId});"
      d="m 459.87859,535.12917 0.97872,-195.70649 86.00682,-0.52808 4.224,196.50824 z"
    />
    <path
      style="fill:#000;fill-opacity:0.5;stroke:none;stroke-width:1.32274px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
      d="m 459.87859,535.12917 0.97872,-195.70649 86.00682,-0.52808 4.224,196.50824 z"
    />
    <path
      style="fill:url(#${patternId});"
      d="m 269.24462,77.597797 c 0,0 94.70712,-35.3119 234.19725,-35.091958 155.12677,0.244568 242.09066,39.806925 242.09066,39.806925 L 681.7571,242.31344 337.85282,260.47539 Z"
    />
    <path
      style="fill:#000;fill-opacity:0.5;stroke:#000000;stroke-width:1.32274px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
      d="m 269.24462,77.597797 c 0,0 94.70712,-35.3119 234.19725,-35.091958 155.12677,0.244568 242.09066,39.806925 242.09066,39.806925 L 681.7571,242.31344 337.85282,260.47539 Z"
    />
    <path
      style="fill:url(#${patternId});fill-opacity:1;stroke:#000000;stroke-width:1.32274px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
      d="m 339.89434,982.76812 337.6462,-0.89321 c 0,0 101.16676,-200.90867 103.03032,-293.03319 1.86361,-92.12453 -136.21895,-193.02533 -136.21895,-193.02533 l -265.81444,4.17916 c 0,0 -153.28007,62.4791 -156.1422,190.40387 -2.86212,127.92471 117.49907,292.3687 117.49907,292.3687 z"
    />
    <path
      style="fill:url(#${patternId});fill-opacity:1;stroke:#000000;stroke-width:1.32274px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
      d="M 92.643384,430.80422 269.24462,77.597797 c 0,0 63.08889,49.191173 221.95138,48.573883 166.40266,-0.64659 254.33653,-43.858916 254.33653,-43.858916 L 955.68284,378.77927 c 0,0 -221.73812,88.35821 -437.71734,83.25162 C 301.98629,456.9243 92.643384,430.80422 92.643384,430.80422 Z"
    />
  `,
};

export type ShapeName = keyof typeof shapes;

export const shapeNames = Object.keys(shapes) as ShapeName[];

interface GenerateProductImageOptions {
  textureName?: TextureName;
  shapeName?: ShapeName;
  width?: number;
  height?: number;

  /**
   * Make the SVG usable as an image. See
   * https://developer.mozilla.org/en-US/docs/Web/SVG/SVG_as_an_Image for
   * details.
   */
  asImage?: boolean;
}

export function generateProductImage({
  textureName = randomElement(textureNames),
  shapeName = randomElement(shapeNames),
  width = 1024,
  height = 1024,

  asImage = false,
}: GenerateProductImageOptions = {}) {
  const patternId = randomId();

  return /* HTML */ `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewbox="0 0 1024 1024"
      width="${width}"
      height="${height}"
    >
      <defs>
        <pattern
          id="${patternId}"
          width="1024"
          height="1024"
          patternUnits="userSpaceOnUse"
        >
          <!-- Fallback color when image is not loaded. -->
          <rect x="0" y="0" width="1024" height="1024" fill="#ddd" />
          <image
            href="/textures/${textureName}-diffuse.jpg"
            x="0"
            y="0"
            width="1024"
            height="1024"
          />
        </pattern>
      </defs>
      ${shapes[shapeName]({ patternId })}
    </svg>
  `;
}
function randomId() {
  return Math.random().toString(36).substring(7);
}

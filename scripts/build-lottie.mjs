import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const outDir = path.resolve("public", "lottie");
fs.mkdirSync(outDir, { recursive: true });

// 1. Status Pulse Animation JSON
const statusPulseAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 100,
  h: 100,
  nm: "status-pulse",
  ddd: 0,
  assets: [],
  layers: [
    // Expanding Ring
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Ring",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { i: { x: [0.4], y: [1] }, o: { x: [0.2], y: [0] }, t: 0, s: [80] },
            { t: 60, s: [0] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { i: { x: [0.2], y: [1] }, o: { x: [0.2], y: [0] }, t: 0, s: [100, 100, 100] },
            { t: 60, s: [240, 240, 100] },
          ],
        },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              s: { a: 0, k: [28, 28] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse",
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.098, 0.447, 0.941, 1] }, // #1972f0 blue
              o: { a: 0, k: 100 },
              nm: "Fill",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              nm: "Transform",
            },
          ],
          nm: "Group",
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
    // Core Solid Circle
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Core",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [50, 50, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              d: 1,
              s: { a: 0, k: [24, 24] },
              p: { a: 0, k: [0, 0] },
              nm: "Ellipse",
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.145, 0.388, 0.922, 1] }, // #2563eb
              o: { a: 0, k: 100 },
              nm: "Fill",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              nm: "Transform",
            },
          ],
          nm: "Group",
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

// 2. Arrow Interaction Animation JSON
const arrowInteractionAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 30,
  w: 24,
  h: 24,
  nm: "arrow-interaction",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Arrow",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { i: { x: 0.2, y: 1 }, o: { x: 0.2, y: 0 }, t: 0, s: [12, 12, 0] },
            { i: { x: 0.2, y: 1 }, o: { x: 0.2, y: 0 }, t: 15, s: [16, 12, 0] },
            { t: 30, s: [12, 12, 0] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 0,
                k: {
                  i: [[0, 0], [0, 0], [0, 0]],
                  o: [[0, 0], [0, 0], [0, 0]],
                  v: [[-3, -4], [2, 0], [-3, 4]],
                  c: false,
                },
              },
              nm: "Path",
            },
            {
              ty: "st",
              c: { a: 0, k: [0.145, 0.388, 0.922, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 2.2 },
              lc: 2,
              lj: 2,
              nm: "Stroke",
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              nm: "Transform",
            },
          ],
          nm: "ArrowGroup",
        },
      ],
      ip: 0,
      op: 30,
      st: 0,
    },
  ],
};

function packageDotLottie(id, animationJson) {
  const tempDir = path.resolve(".temp-lottie", id);
  const animDir = path.join(tempDir, "animations");
  fs.mkdirSync(animDir, { recursive: true });

  const manifest = {
    version: "1.0",
    generator: "dotlottie-generator",
    author: "Faisal Khan",
    animations: [
      {
        id: id,
        speed: 1,
        themeColor: "#2563eb",
        loop: true,
        autoplay: true,
      },
    ],
  };

  fs.writeFileSync(path.join(tempDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(animDir, `${id}.json`), JSON.stringify(animationJson));

  const zipFile = path.join(outDir, `${id}.zip`);
  const lottieFile = path.join(outDir, `${id}.lottie`);

  if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);
  if (fs.existsSync(lottieFile)) fs.unlinkSync(lottieFile);

  // Compress using PowerShell Compress-Archive
  execSync(`powershell -Command "Compress-Archive -Path '${tempDir}/*' -DestinationPath '${zipFile}' -Force"`);
  fs.renameSync(zipFile, lottieFile);
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log(`Generated ${lottieFile} (${fs.statSync(lottieFile).size} bytes)`);
}

packageDotLottie("status-pulse", statusPulseAnimation);
packageDotLottie("arrow-interaction", arrowInteractionAnimation);
console.log("dotLottie packaging complete.");

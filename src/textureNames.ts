import { opendir } from "node:fs/promises";
import path from "node:path";
import { lazyPromise } from "./lazyPromise";

export const textureNames = lazyPromise(async () => {
  const dir = await opendir(path.join(__dirname, "../textures"));

  const textureNames = new Set<string>();

  for await (const dirent of dir) {
    textureNames.add(dirent.name.split("-")[0]);
  }

  return textureNames;
});

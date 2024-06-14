import express from "express";
import { textureNames } from "./textureNames";
import { generateProductImage } from "./generateProductImage";

const app = express();
const port = 3000;

app.use("/textures", express.static("textures"));

app.get("/", (req, res, next) => {
  res.type("svg").send(generateProductImage());
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});

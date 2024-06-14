import express from "express";
import {
  ShapeName,
  TextureName,
  generateProductImage,
  shapeNames,
  textureNames,
} from "./generateProductImage";
import { randomElement } from "./randomElement";

const app = express();
const port = 3000;

app.use("/textures", express.static("textures"));

app.get("/", (req, res) => {
  res.type("html").send(
    "<!DOCTYPE html>\n" +
      /* HTML */ `
        <html>
          <body>
            <table>
              ${textureNames
                .map(
                  (textureName) => /* HTML */ `
                    <tr>
                      ${shapeNames
                        .map((shapeName) => {
                          const imageUrl = getImageUrl({
                            shapeName,
                            textureName,
                          });

                          return /* HTML */ `
                            <td>
                              <a href="${imageUrl}">
                                ${generateProductImage({
                                  shapeName,
                                  textureName,
                                  width: 128,
                                  height: 128,
                                })}
                              </a>
                            </td>
                          `;
                        })
                        .join("\n")}
                    </tr>
                  `
                )
                .join("\n")}
            </table>
          </body>
        </html>
      `
  );
});

app.get("/image", (req, res, next) => {
  const textureName = textureNames.find((x) => x === req.query.textureName);
  const shapeName = shapeNames.find((x) => x === req.query.shapeName);

  if (textureName === undefined || shapeName === undefined) {
    res.redirect(
      getImageUrl({
        textureName: textureName ?? randomElement(textureNames),
        shapeName: shapeName ?? randomElement(shapeNames),
      })
    );
    return;
  }

  res.type("svg").send(
    generateProductImage({
      textureName,
      shapeName,
    })
  );
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}/`);
});

function getImageUrl({
  shapeName,
  textureName,
}: {
  shapeName: ShapeName;
  textureName: TextureName;
}) {
  return (
    "/image?" +
    new URLSearchParams({
      shapeName,
      textureName,
    })
  );
}

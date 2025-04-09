/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-spacing */
/* eslint-disable require-jsdoc */

const compiler = require("@angular/compiler");
const functions = require("firebase-functions");
const express = require("express");
const { join } = require("path");
const { existsSync } = require("fs");

const app = express();
const distFolder = join(process.cwd(), "dist/active-store/browser");
const indexHtml = existsSync(join(distFolder, "index.original.html"))
  ? "index.original.html"
  : "index";
async function bootstrap() {
  const { ngExpressEngine } = await import("@nguniversal/express-engine");
  const { AppServerModule } = await import(
    "./../dist/active-store/server/main.server.mjs"
  );
  const { APP_BASE_HREF } = await import("@angular/common");
  app.engine("html", ngExpressEngine({ bootstrap: AppServerModule }));
  app.set("view engine", "html");
  app.set("views", distFolder);
  app.get("*.*", express.static(distFolder, { maxAge: "1y" }));

  app.get("*", (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });
  exports.ssr = functions.https.onRequest(app);
}
bootstrap();

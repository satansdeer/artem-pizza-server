const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const router = express.Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API V1",
      version: "1.0.0",
    },
  },
  apis: ["./v1/orders/*.js", "./v1/ingredients/*.js"],
};

const docs = swaggerJsDoc(options);

router.use('/', swaggerUI.serveFiles(docs, {}), swaggerUI.setup(docs));

module.exports = { swaggerUI: router };

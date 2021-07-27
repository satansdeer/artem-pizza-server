const express = require("express");
const { swaggerUI } = require("./swaggerUI")
const ingredientsRouter = require("./ingredients/routes");
const ordersRouter = require("./orders/routes");

const app = express()

app.use('/api-docs', swaggerUI)

app.use("/v1/orders", ordersRouter);
app.use("/v1/ingredients", ingredientsRouter);

module.exports = { v1: app }

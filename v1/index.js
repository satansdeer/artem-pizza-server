const express = require("express");
const { swaggerUI } = require("./swaggerUI")
const ingredientsRouter = require("./ingredients/routes");
const ordersRouter = require("./orders/routes");
const { configureDb } = require("../db/configureDb");

const app = express()
app.db = configureDb();

app.use('/api-docs', swaggerUI)

app.use("/orders", ordersRouter);
app.use("/ingredients", ingredientsRouter);

module.exports = { v1: app }

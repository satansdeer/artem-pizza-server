const express = require("express");
const { swaggerUI } = require("./swaggerUI")
const authRouter = require("./auth/routes");
const ingredientsRouter = require("./ingredients/routes");
const ordersRouter = require("./orders/routes");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const app = express()

app.use(passport.initialize());

const user = {
  id: "1",
  email: "example@email.com",
  password: "password",
};

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      if (email === user.email && password === user.password) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "jwt_secret",
    },
    (jwt_payload, done) => {
      if (user.id === jwt_payload.user._id) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: "Token not matched.",
        });
      }
    }
  )
);

app.use('/api-docs', swaggerUI)

app.use("/auth", authRouter);
app.use("/orders", ordersRouter);
app.use("/ingredients", ingredientsRouter);

module.exports = { v2: app }

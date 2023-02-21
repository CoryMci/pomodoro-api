const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const User = require("../models/user");
require("dotenv").config();

const PUB_KEY = process.env.PUB;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, function (jwt_payload, next) {
      User.findOne({ _id: jwt_payload.sub }, function (err, user) {
        if (err) {
          return next(err, false);
        }
        if (user) {
          return next(null, user);
        } else {
          return next(null, false);
        }
      });
    })
  );
};

import passport from "passport";
import PassportHTTP from "passport-http";
import db from "./db";

const checkPassword = (user, pass) => {
  const dbUser = findUser(user);
  // Check if user exists
  if (!dbUser) return false;

  return dbUser.password === pass;
};

const findUser = user => db[user];

passport.use(
  new PassportHTTP.BasicStrategy((user, pass, done) => {
    if (pass && user && checkPassword(user, pass)) {
      done(null, findUser(user));
    } else {
      return done(null, false);
    }
  })
);

export default passport;

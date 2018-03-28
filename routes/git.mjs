import express from "express";
import GitServer from "node-git-server";
import { REPOS_DIR } from "../config.mjs";

const repos = new GitServer(REPOS_DIR);

repos.on("push", push => {
  console.log(`push ${push.commit}`);
  push.accept();
});

repos.on("fetch", function(fetch) {
  console.log(`fetch ${fetch.commit}`);
  fetch.accept();
});

const git = express.Router();

git.all(
  "/:user/:repo*",
  (req, res, next) => {
    // Check if user has access to this repo
    if (req.params.user !== req.user.username)
      return res.status(403).send("Access denied");

    next();
  },
  (req, res) => repos.handle(req, res)
);

export default git;

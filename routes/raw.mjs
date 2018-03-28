import express from "express";
import { raw } from "../services/git";

const rawRoute = express.Router();

rawRoute.get("/:user/:repo/:commit/*", (req, res) => {
  const { user, repo, commit } = req.params;
  const filepath = req.params[0];

  raw(user, repo, commit, filepath, res);
});

export default rawRoute;

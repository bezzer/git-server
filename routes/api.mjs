import express from "express";

import { history, files } from "../services/git";
import { repos } from "../services/user";

const api = express.Router();

api.get("/:user", async (req, res) => {
  const data = await repos(req.params.owner);

  res.json({ success: true, data });
});

api.get("/:user/:repo/:commit/*", async (req, res) => {
  const { user, repo, commit } = req.params;
  const filepath = params[0];
  const data = await files(user, repo, path);

  res.json({ success: true, data });
});

api.get("/history/:user/:repo", async (req, res) => {
  const { user, repo } = req.params;
  const data = await history(user, repo);

  res.json({ success: true, data: [] });
});

export default api;

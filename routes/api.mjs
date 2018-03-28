import express from "express";

import { history, files } from "../services/git";
import { createRepo } from "../services/git/utils";
import { auth, repos } from "../services/user";

const api = express.Router();

// Create new repo
api.get(
  "/create/:user/:repo",
  auth.authenticate(["basic"], { session: false }),
  async (req, res) => {
    const { user, repo } = req.params;

    // Validate user is creating repo for themselves
    if (user !== req.user.username)
      return res.status(403).json({
        success: false,
        message: "You can't create repos for other people",
      });

    try {
      await createRepo(user, repo);
      res.json({ success: true, message: `Created ${repo} for ${user}` });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }
);

// List user repos
api.get("/:user", async (req, res) => {
  const data = await repos(req.params.user);

  res.json({ success: true, data });
});

// List files in repo
api.get("/:user/:repo/:commit/*", async (req, res) => {
  const { user, repo, commit } = req.params;
  const path = req.params[0];
  const data = await files(user, repo, commit, path);

  res.json({ success: true, data });
});

// List commit history for repo
api.get("/history/:user/:repo", async (req, res) => {
  const { user, repo } = req.params;
  const data = await history(user, repo);

  res.json({ success: true, data: [] });
});

export default api;

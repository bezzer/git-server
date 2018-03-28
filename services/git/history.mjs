import fs from "fs-extra";
import path from "path";
import Nodegit from "nodegit";

import { getLinkUrl, openRepo } from "./utils";
import { REPOS_DIR } from "../../config";

const history = async (user, selectedRepo) => {
  const repo = await openRepo(user, selectedRepo);

  try {
    const masterCommit = await repo.getMasterCommit();
    const history = masterCommit.history(Nodegit.Revwalk.SORT.Time);

    return new Promise((resolve, reject) => {
      history.start();
      history.on("end", results => {
        // Extract the useful info from the commits
        const commits = results.map(commit =>
          formatCommit(user, selectedRepo, commit)
        );
        resolve(commits);
      });
      history.on("error", err => reject(err));
    });
  } catch (err) {
    console.log(err);
    repo.free();
    return [];
  }
};

const formatCommit = (user, repo, commit) => ({
  time: commit.time(),
  author: {
    email: commit.author().email(),
    name: commit.author().name(),
  },
  message: commit.message(),
  sha: commit.sha(),
  link: getLinkUrl(user, repo, commit.sha()),
});

export default history;

import fs from "fs-extra";
import path from "path";

import { REPOS_DIR } from "../../config";

const history = async (user, repo) => {
  const repo = await openRepo(user, project);

  try {
    const masterCommit = await repo.getMasterCommit();
    const history = masterCommit.history(git.Revwalk.SORT.Time);

    return new Promise((resolve, reject) => {
      history.start();
      history.on("end", commits => {
        _repo.free();
        resolve(commits);
      });
      history.on("error", err => reject(err));
    });
  } catch (err) {
    console.log(err);
    if (_repo) _repo.free();
    return [];
  }
};

export default history;

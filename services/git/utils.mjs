import path from "path";
import fs from "fs-extra";
import Nodegit from "nodegit";

import { BASE_URL, REPOS_DIR } from "../../config";

const IS_BARE = 1;

export const getRepoPath = (user, repo) =>
  path.join(REPOS_DIR, user, `${repo}.git`);

export const createRepo = async (user, repo) => {
  const repoPath = getRepoPath(user, repo);
  await fs.mkdirs(repoPath);

  return Nodegit.Repository.init(repoPath, IS_BARE);
};

export const openRepo = (user, repo) =>
  Nodegit.Repository.open(getRepoPath(user, repo));

export const getCommit = async (repo, commit) => {
  let result;
  try {
    result = await repo.getCommit(commit);
  } catch (error) {
    result = await repo.getBranchCommit(commit);
  }

  return result;
};

// Link to raw file data
export const getRawUrl = (user, repo, commit, filePath) =>
  `${BASE_URL}/raw/${user}/${repo}/${commit}/${filePath}`;

// URL to list details via API
export const getLinkUrl = (user, repo, commit, filePath) =>
  `${BASE_URL}/api/${user}/${repo}/${commit}/${filePath || ""}`;

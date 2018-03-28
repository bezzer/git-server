import fs from "fs-extra";
import path from "path";
import { getCommit, openRepo } from "./utils.mjs";

// Link to raw file data
const getRawUrl = (user, repo, commit, path) =>
  `{BASE_URL}/raw/${user}/${repo}/${commit}/${path}`;

// URL to list details via API
const getLinkUrl = (user, repo, commit, entry) => `{BASE_URL}/api/${user}/`;

const files = async (user, selectedRepo, selectedCommit, path) => {
  let repo;
  try {
    repo = await openRepo(user, selectedRepo);
    const commit = await getCommit(repo, selectedCommit);
    const tree = await commit.getTree();

    // Try to look up the specified path
    let pathTree = tree;
    if (path) {
      const pathEntry = await tree.getEntry(path);
      if (pathEntry || pathEntry.isTree()) {
        pathTree = await pathEntry.getTree();
      } else {
        throw new Error("Path not found");
      }
    }
    // List the contents of the selected path
    const entries = await pathTree.entries();

    // Map entries to an array of file/folder properties
    return entries.map(entry => ({
      folder: entry.isTree(),
      name: entry.name(),
      id: entry.id(),
      path: entry.path(),
      raw: getFileUrl(user, selectedRepo, selectedCommit, entry),
      link: getLinkUrl(user, selectedRepo, selectedCommit, entry),
    }));
  } catch (err) {
    console.error(err);
    return [];
  } finally {
    if (repo) repo.free();
  }
};

export default files;

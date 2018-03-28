import fs from "fs-extra";
import path from "path";
import { getCommit, openRepo, getLinkUrl, getRawUrl } from "./utils.mjs";
import { BASE_URL } from "../../config";

const files = async (user, selectedRepo, selectedCommit, path) => {
  let repo;
  try {
    repo = await openRepo(user, selectedRepo);
    const commit = await getCommit(repo, selectedCommit);
    const tree = await commit.getTree();
    let pathTree = tree;
    let result = {};

    // Try to look up the specified path
    if (path) {
      const pathEntry = await tree.getEntry(path);
      result = formatEntry(user, selectedRepo, selectedCommit, pathEntry);
      if (pathEntry.isTree()) {
        pathTree = await pathEntry.getTree();
      }
    }
    // List the contents of the selected path
    const entries = await pathTree.entries();
    // Map entries to an array of file/folder properties
    result.children = entries.map(entry =>
      formatEntry(user, selectedRepo, selectedCommit, entry)
    );

    return result;
  } catch (err) {
    console.error(err);
    return {};
  } finally {
    if (repo) repo.free();
  }
};

const formatEntry = (user, repo, commit, entry) => ({
  folder: entry.isTree(),
  name: entry.name(),
  id: entry.sha(),
  path: entry.path(),
  raw: getRawUrl(user, repo, commit, entry.path()),
  link: getLinkUrl(user, repo, commit, entry.path()),
});

export default files;

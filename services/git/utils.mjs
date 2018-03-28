export const openRepo = (user, repo) => {};

export const getCommit = (repo, commit) => {
  try {
    return repo.getCommit(commit);
  } catch {
    return repo.getBranchCommit(commit);
  }
};

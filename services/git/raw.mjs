import mime from "mime-types";
import { openRepo, getCommit } from "./utils";

const readFile = async (user, selectedRepo, selectedCommit, path, res) => {
  try {
    const repo = await openRepo(user, selectedRepo);
    if (!repo) throw new Error("Repo not found");

    // Try looking up first as commit hash, then try as branch
    const commit = await getCommit(repo, selectedCommit);

    if (!commit) throw new Error("Branch or commit not found");

    const entry = await commit.getEntry(path);
    if (!entry) throw new Error("File not found");

    const blob = await entry.getBlob();
    res.writeHead(200, {
      "Content-Type": mime.lookup(entry.name()),
      "Content-Length": blob.rawsize(),
    });

    res.end(blob.content());
  } catch (error) {
    res.status(404).send(`Not found: ${error.message}`);
  }
};

export default readFile;

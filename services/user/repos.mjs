import fs from "fs-extra";
import path from "path";

import { REPOS_DIR } from "../../config";

const repos = owner => fs.readdir(path.join(REPOS_DIR, owner));

export default repos;

import Express from "express";
import GitServer from "node-git-server";
import { auth, repos } from "./services/user";

import { api, raw, git } from "./routes";

const app = Express();

app.use("/api", api);
app.use("/raw", raw);

app.use("/", auth.authenticate(["basic"], { session: false }), git);

app.listen(8000);

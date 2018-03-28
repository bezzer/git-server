import Express from "express";
import GitServer from "node-git-server";
import passport from "passport";

import { api, raw, git } from "./routes";

const app = Express();

app.use("/api", api);
app.use("/raw", raw);
app.use("/", git);

app.listen(8000);

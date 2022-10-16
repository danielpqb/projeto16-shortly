import express from "express";
import cors from "cors";

import usersRouter from "./routers/users.router.js";
import urlsRouter from "./routers/urls.router.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(usersRouter);
app.use(urlsRouter);

export default app;

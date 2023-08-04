import express from "express";
import githubUserRoutes from "./githubUserRoutes";

const routes = express();
routes.use(express.json(), githubUserRoutes);

export default routes;
import express from "express";
import githubUser from "./githubUserRoutes";

const routes = express();
routes.use(express.json(), githubUser);

export default routes;
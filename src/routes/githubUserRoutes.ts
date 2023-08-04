import express from 'express';
import githubUserController from '../controller/GithubUserController';

const router = express.Router();

router
  .get("/users/:username/repos", githubUserController.getUserRepos)
  .get("/users/:username/details", githubUserController.getUserDetails)
  .get("/users", githubUserController.getUsersSinceId);

export default router;
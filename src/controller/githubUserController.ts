import { Request, Response } from "express";
import PORT from "../serverConfig";
import axios from "axios";

const request = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    'Authorization': "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",
    'Accept': "application/vnd.github+json",
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

const getUserRepos = async (req: Request, res: Response) => {
  const { username } = req.params;

  const result = await request.get("/users/" + username + "/repos")
    .then(response => {
      return res.status(200).json(response.data)
    })
    .catch(error => { return res.status(404).json({ message: "Invalid username. Please check it and try again." }) });
}

const getUserDetails = async (req: Request, res: Response) => {
  const { username } = req.params;

  const returnValue = await request.get("/users/" + username)
    .then(response => {
      return res.status(200).json(response.data);
    })
    .catch(error => { return res.status(404).json(error.message) });
}

const getUsersSinceId = async (req: Request, res: Response) => {
  const { since = 1, per_page = 30 } = req.query;

  const requestData = await request.get("/users?since=" + since + "&per_page=" + per_page)
    .then(response => {
      return response.data
    })
    .catch(error => { return error.message });

  res.json({
    data: requestData,
    nextPage: `http://localhost:${PORT}/api/users?since=${Number(since) + Number(per_page)}`
  });
}

export default { getUserRepos, getUserDetails, getUsersSinceId };
import { Request, Response } from "express";
import PORT from "../serverConfig";
import axios from "axios";

console.log(PORT);

const getUserRepos = async (req: Request, res: Response) => {
  const { username } = req.params;

  const instance = await axios.create({
    baseURL: "https://api.github.com",
    headers: {
      'Authorization': "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",
      'Accept': "application/vnd.github+json",
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  const result = await instance.get("/users/" + username + "/repos")
    .then(response => {
      return response.data
    })
    .catch(error => { return error.message });

  res.send(result);
}

const getUserDetails = async (req: Request, res: Response) => {
  const { username } = req.params;

  const instance = await axios.create({
    baseURL: "https://api.github.com",
    headers: {
      'Authorization': "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",
      'Accept': "application/vnd.github+json",
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  const returnValue = await instance.get("/users/" + username)
    .then(response => {
      return response.data
    })
    .catch(error => { return error.message });

  res.json({ returnValue });
}

const getUsersSinceId = async (req: Request, res: Response) => {
  const { since = 1, per_page = 30 } = req.query;

  const request = await axios.create({
    baseURL: "https://api.github.com",
    headers: {
      'Accept': "application/vnd.github+json",
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

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
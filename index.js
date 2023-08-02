import { Octokit, App } from "octokit";
import express from "express";
const PORT = 8080;

const app = express();
app.use(express.json());
app.use("/api");

app.listen(
  PORT,
  () => console.log(`Server is running on PORT ${PORT}`)
);

const defaultRoute = 'https://api.github.com';

const octokit = new Octokit({
  auth: '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'
});

async function getUserJoinDate() {
  await octokit.request('GET /user', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
}
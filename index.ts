import "dotenv/config";
import type { GitFile, Greeting } from "./types";
import { Octokit } from "octokit";
import { decode64, encode64 } from "./utils.js";

console.log("Hello World");

async function getFileData(): Promise<GitFile> {
  const username = process.env.GITHUB_USERNAME;
  if (!username) throw new Error("need to add GITHUB_USERNAME in .env file.");

  const pat = process.env.GITHUB_PAT;
  if (!pat) throw new Error("need to add GITHUB_PAT in .env file");

  const res = await fetch(
    `https://api.github.com/repos/${username}/githubdb/contents/test.json`,
    {
      headers: {
        authorization: `token ${pat}`,
      },
    }
  );
  if (!res.ok) throw new Error(`${res.status}: An error has occured.`);
  return await res.json();
}

async function updateJson(sha: string, json: Greeting) {
  const username = process.env.GITHUB_USERNAME;
  if (!username) throw new Error("need to add GITHUB_USERNAME in .env file.");

  const pat = process.env.GITHUB_PAT;
  if (!pat) throw new Error("need to add GITHUB_PAT in .env file");

  const email = process.env.GITHUB_EMAIL;
  if (!email) throw new Error("need to add GITHUB_EMAIL in .env file");

  const octokit = new Octokit({
    auth: pat,
  });

  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner: username,
    repo: "githubdb",
    path: "test.json",
    message: "Testing update data.json through Node js",
    committer: {
      name: "Eric Chu",
      email: email,
    },
    content: encode64(json),
    sha: sha,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

try {
  const data = await getFileData();

  const json = decode64<Greeting>(data.content);
  json.greeting = "YOOOOOO HELLLOOOOO!";
  await updateJson(data.sha, json);
} catch (e) {
  console.error(e);
  process.exit(-1);
}

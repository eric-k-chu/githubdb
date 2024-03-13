import "dotenv/config";
import { GitFile } from "./types";

console.log("Hello World");

async function getSHA(): Promise<string> {
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
  const data = (await res.json()) as GitFile;
  return data.sha;
}

async function updateJson(sha: string) {
  const username = process.env.GITHUB_USERNAME;
  if (!username) throw new Error("need to add GITHUB_USERNAME in .env file.");

  const pat = process.env.GITHUB_PAT;
  if (!pat) throw new Error("need to add GITHUB_PAT in .env file");

  const content = {
    greeting: "Hello World",
  };

  const data = {
    message: "Testing update Data through Node js",
    content: btoa(JSON.stringify(content)),
  };

  const res = await fetch(``, {
    method: "PUT",
    headers: {
      authorization: `token ${pat}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`${res.status}: An error has occured.`);
}

try {
  const sha = await getSHA();
  await updateJson(sha);
} catch (e) {
  console.error(e);
  process.exit(-1);
}

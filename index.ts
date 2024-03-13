import "dotenv/config";
import { GitFile } from "./types";

console.log("Hello World");

async function getFile() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) throw new Error("need to add GITHUB_USERNAME in .env file.");

  const pat = process.env.GITHUB_PAT;
  if (!pat) throw new Error("need to add GITHUB_PAT in .env file");

  const res = await fetch(
    `https://api.github.com/repos/${username}/githubdb/contents/README.md`,
    {
      headers: {
        authorization: `token ${pat}`,
      },
    }
  );
  const data = (await res.json()) as GitFile;
  console.log(data.sha);
}

try {
  getFile();
} catch (e) {
  console.error(e);
  process.exit(-1);
}

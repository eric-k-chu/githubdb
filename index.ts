import "dotenv/config";

console.log("Hello World");

async function getRepo() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) throw new Error("need to add GITHUB_USERNAME in .env file.");

  const pat = process.env.GITHUB_PAT;
  if (!pat) throw new Error("need to add GITHUB_PAT in .env file");

  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      authorization: `token ${pat}`,
    },
  });
  const data = await res.json();
  console.log(data);
}

try {
  getRepo();
} catch (e) {
  console.error(e);
  process.exit(-1);
}

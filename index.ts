import "dotenv/config";

console.log("Hello World");

async function getRepo() {
  const username = process.env.GITHUB_USERNAME;
  if (!username) throw new Error("need to add GITHUB_USERNAME in .env file.");

  const res = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`
  );
  const data = await res.json();
  console.log(data);
}

try {
  getRepo();
} catch (e) {
  console.error(e);
  process.exit(-1);
}

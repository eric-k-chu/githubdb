declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_USERNAME: string;
      GITHUB_PAT: string;
      GITHUB_EMAIL: string;
    }
  }
}

export interface GitFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  content: string;
}

export interface Greeting {
  greeting: string;
}

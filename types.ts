declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_USERNAME: string;
      GITHUB_PAT: string;
    }
  }
}

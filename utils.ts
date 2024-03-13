export function decode64<T>(b64: string): T {
  return JSON.parse(atob(b64));
}

export function encode64<T>(obj: T): string {
  return btoa(JSON.stringify(obj));
}

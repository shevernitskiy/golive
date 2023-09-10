export function log(message: string): void {
  if (Deno.env.get("DEBUG")) console.log(message);
}

export function error(message: string): void {
  console.error(`%c${message}`, "color: red; font-weight: bold");
}

export function info(message: string): void {
  console.info(`%c${message}`, "color: yellow");
}

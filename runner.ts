import { parseToml } from "./deps.ts";
import { app } from "./src/app.ts";
import { error, info } from "./src/core/logger.ts";

function shutdown(): void {
  info("Shutting down...");
  Deno.exit(0);
}

Deno.addSignalListener("SIGINT", shutdown);
Deno.addSignalListener("SIGBREAK", shutdown);

const toml = parseToml(Deno.readTextFileSync("./config.toml"));

if (!toml.runner_delay || toml.runner_delay as number < 60) {
  error("Incorrect update interval, unable to start runner...");
  Deno.exit(1);
}

setInterval(async () => await app(), toml.runner_delay as number * 1000);

info(`Starting runner, update interval: ${toml.runner_delay} sec`);
await app();

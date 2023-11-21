import { parseToml } from "./deps.ts";
import { app } from "./src/app.ts";
import { error } from "./src/core/logger.ts";

const toml = parseToml(Deno.readTextFileSync("./config.toml"));

if (!toml.runner_delay || toml.runner_delay as number < 60) {
  error("Incorrect update interval, unable to start runner...");
  Deno.exit(1);
}

Deno.cron("update", `*/${Math.floor(toml.runner_delay as number / 60)} * * * *`, async () => await app());

Deno.serve(async () => {
  await app();
  return new Response("Ok");
});

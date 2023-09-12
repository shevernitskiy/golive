import { parseToml } from "../../deps.ts";
import type { Config } from "../types.ts";

function isDenoDeploy(): boolean {
  return Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
}

export async function getConfig(): Promise<Config> {
  const toml = parseToml(Deno.readTextFileSync("./config.toml"));
  const db = isDenoDeploy() ? undefined : "kv.db";
  const env_map = new Map<string, string>();

  if (!isDenoDeploy()) {
    const env = Deno.readTextFileSync("./.env");

    for (const line of env.split("\n")) {
      const kv = line.split("=");
      if (kv.length < 2) continue;
      env_map.set(kv[0].trim(), kv[1].trim());
    }
  }

  const map = isDenoDeploy() ? Deno.env : env_map;

  return {
    source_order: toml.source_order as string[],
    db: await Deno.openKv(db),
    telegram: {
      token: map.get("TELEGRAM_TOKEN"),
      channel_id: map.get("TELEGRAM_CHANNEL_ID") ? Number(map.get("TELEGRAM_CHANNEL_ID")) : undefined,
      template: (toml.target as { telegram: { template: string } }).telegram.template,
    },
    discord: {
      token: map.get("DISCORD_TOKEN"),
      channel_id: map.get("DISCORD_CHANNEL_ID"),
      template: (toml.target as { discord: { template: string } }).discord.template,
    },
    twitch: {
      channel: map.get("TWITCH_CHANNEL"),
    },
    vk: {
      channel: map.get("VK_CHANNEL"),
    },
    trovo: {
      channel: map.get("TROVO_CHANNEL"),
    },
  };
}

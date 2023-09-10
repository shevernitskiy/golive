import { getConfig } from "./core/config.ts";
import { GoLive } from "./core/golive.ts";
import { log } from "./core/logger.ts";
import { Twitch } from "./source/twitch.ts";
import { Vk } from "./source/vk.ts";
import { Discord } from "./target/discord.ts";
import { Telegram } from "./target/telegram.ts";

export async function handler(): Promise<Response> {
  await app();
  return new Response("Ok");
}

export async function app(): Promise<void> {
  const config = await getConfig();
  const golive = new GoLive(config);

  // iterating to preserve right order
  for (const source of config.source_order) {
    switch (source) {
      case "vk":
        if (config.vk.channel) {
          log(`[vk] add source, channel: ${config.vk.channel}`);
          golive.use(new Vk(config.vk.channel));
        }
        break;
      case "twitch":
        if (config.twitch.channel) {
          log(`[twitch] add source, channel: ${config.twitch.channel}`);
          golive.use(new Twitch(config.twitch.channel));
        }
        break;
    }
  }

  if (config.telegram.token && config.telegram.channel_id) {
    log(`[telegram] add target, channel: ${config.telegram.channel_id}`);
    golive.use(new Telegram(config.telegram.token, config.telegram.channel_id, config.telegram.template));
  }

  if (config.discord.token && config.discord.channel_id) {
    log(`[discord] add target, channel: ${config.discord.channel_id}`);
    golive.use(new Discord(config.discord.token, config.discord.channel_id, config.discord.template));
  }

  await golive.execute();
  golive.shutdown();
}

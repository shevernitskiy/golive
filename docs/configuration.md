# Configuration

## Enviroment variables

Enviroment variables used for sansetive data like tokens or channel names/ids. In case of standalone executable there is
a `.env` file right near the exectuable. In case of _Deno Deploy_ these variables setted through dashboard project
interface.

If you want to use a specific _source_ (twitch, vk) or _target_ (telegram, discord), you should fill in env variables
related to this service.

> Example: You want to use your Twitch account as trigger and info source and notify users in your Discord. Then you
> should fill: `TWITCH_CHANNEL`, `DISCORD_TOKEN`, `DISCORD_CHANNEL_ID`. Want to add Telegram? Set
> `TELEGRAM_TOKEN`,`TELEGRAM_CHANNEL_ID` as well.

| Name                  | Description                                                                                                                                       |
| --------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TELEGRAM_TOKEN`      | telegram bot token, set it if you want to create notification in your telegram channel (bot must have te rights to make a post in target channel) |
| `TELEGRAM_CHANNEL_ID` | telegram channel id, should be setted to create notification in your telegram channel (it id started with `-100`)                                 |
| `DISCORD_TOKEN`       | discord application token, bot should be authorized and has rights to create messages in target guild and channel                                 |
| `DISCORD_CHANNEL_ID`  | discord channel id                                                                                                                                |
| `TWITCH_CHANNEL`      | twitch channel name, which will be used to fetch stream info                                                                                      |
| `VK_CHANNEL`          | vklive channel name, which will be used to fetch stream info                                                                                      |
| `TROVO_CHANNEL`       | vklive channel name, which will be used to fetch stream info                                                                                      |

## config.toml

Config file contains basic config data.

| Field                           | Description                                                                                                                                                       |
| ------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `runner_delay`                  | interval between updates in seconds, will be used by standalone runner                                                                                            |
| `source_order`                  | array of source names (streaming platform), this is the order of priority from where to get stream meta data (reasonable if you stream to more then one platform) |
| `target.{target_name}.template` | template for the post message, if you want to change it, be sure it has correct structure (telegram -> parse_mode: HTML, discord -> embed)                        |

# 🔴golive

**golive** is a simple stream script/bot notifier. But it can do a bit more than similar common services.

It tracks your channels on stream platforms and makes an _updatable_ nice looking posts in your social networks and
messaging services with actual stream info and preview image. After the stream, it deletes the post.

#### Supported streaming platforms:

- Twitch
- VK Live

##### Supported messaging services:

- Telegram
- Discord

## How it works

The core of **golive** is a simple script. When it runs, it goes to streaming platforms, fetch info about the stream.
Then, if there is no announcement about this stream, it creates a new one. If there is an announcement , it updates it
with actual data. If there is the announcement , but the stream has been ended, the post wiil be deleted.

## How to use it

There are several options to use **golive**.

1. Run the binary from the release locally. Archive contains an executable binary with **runner** (described below).
2. Set up the script to _Deno Deploy_ and trigger it with cron. You don't even need to download anything. But there will
   be some configuration moments.
3. Run the code with `deno` locally.

### Running options

- You can trigger the script manually with `run.ts`. In this case, it will be performed just ones.
- To get updatable post and constant stream tracking, you need to trigger the script constantly with some delay. There
  is `runner.ts` for this task. It starts the process and runs the script every 180sec (by default). A runner also a
  compile entry for binaries.
- In the case of using on _Deno Deploy_ there is `server.ts`, which could handle an incoming http request and trigger
  the script.

## Configuration

There are two main files `config.toml` and `.env`.

- `config.toml` contains post templates and other basic bot configuration
- `.env` contains sensitive information, like bot tokens and channel names/id (in the case of _Deno Deploy_ env should
  be setted through admin dashboard, but not in file)

If you don't have or don't want to use some service, just leave the field blank in .`env`

More detailed instructions are coming soon...

## Showcase

<div style="display: flex">
<div style="margin-right: 15px">

### Telegram announce

<img width="345" alt="image" src="https://github.com/shevernitskiy/golive/assets/28886342/f7ce8163-988d-4888-b7db-10808b9f1ccf">
</div>
<div>

### Discord announce

<img width="329" alt="image" src="https://github.com/shevernitskiy/golive/assets/28886342/c43ac18e-c119-4550-b21d-68d3af72b6dc">
</div>
</div>

# Contribution

Pull request, issues and feedback are very welcome. Code style is formatted with deno fmt.

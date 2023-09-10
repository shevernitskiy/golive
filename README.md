# 🔴golive

**golive** is a simple stream script/bot notifier. But it can do a bit more then similar common service and by your own
rules.

It tracks your channels on stream platforms and make an _updatable_ nice looking posts in your social networks and
messaging services with actual stream info and preview image. After the stream it deletes the post.

## How it works

The core of **golive** is simple script. When it runs, it goes to streaming platforms, fetch info about the stream.
Then, if there is no announce about this stream, it creates new one. If there is the announce, it updates it with actual
data. If there is the announce, but the stream has beed ended, post deleted.

## How to use it

There are several option to actual use **golive**.

1. Run the binary from the release localy. Archive contains executable binary with **runner** (described below).
2. Setup the script to _Deno Deploy_ and trigger it with cron. You don't even need to download anything. But there will
   be some configuration moments.
3. Run the code with `deno` localy.

### Running options

- You can trigger script manualy with `run.ts`. In this case it will be perfromed just ones.
- To get updatable post and constant stream tracking you need trigger script constantly with some delay. There is
  `runner.ts` for this task. It is starting process and runs the script every 180sec (by default). Runner also is a
  compile entry for binaries.
- In case of using on _Deno Deploy_ there is `server.ts`, which could handle incoming http request and trigger the
  script.

## Configuration

There are two main files `config.toml` and `.env`.

- `config.toml` contains post templates and other basic bot configuration
- `.env` contains sensative information, like bot tokens and channel names and id (in case of _Deno Deploy_ env setted
  through admin dashboard, but not in file)

If you don't have or don't want to use some service, just leave the field blank in .`env`

More detailed instructions coming soon...

## Showcase

### Telegram announce

<img width="345" alt="image" src="https://github.com/shevernitskiy/golive/assets/28886342/f7ce8163-988d-4888-b7db-10808b9f1ccf">

### Discord announce

<img width="329" alt="image" src="https://github.com/shevernitskiy/golive/assets/28886342/c43ac18e-c119-4550-b21d-68d3af72b6dc">

# Contribution

Pull request, issues and feedback are very welcome. Code style is formatted with deno fmt.

<div align="center" style="height: 140px; padding: 30px">
  <img height="120" alt="image" src="https://graph.digiseller.ru/img.ashx?id_d=3356071"/>
  <img height="120" alt="image" src="https://images.vkplay.live/user/9219868/avatar?change_time=1685723528"/>
  <img height="120" alt="image" src="https://raw.githubusercontent.com/github/explore/e9b60076c672159b441c7054f765635a5a30683a/topics/twitch/twitch.png"/>
  <img height="120" alt="image" src="https://www.svgrepo.com/show/416456/arrow-interface-next.svg"/>
  <img height="120" alt="image" src="https://www.svgrepo.com/show/331368/discord-v2.svg"/>
  <img height="120" alt="image" src="https://www.svgrepo.com/show/303292/telegram-logo.svg"/>
</div>

<br/>

[![deno module](https://shield.deno.dev/x/golive)](https://deno.land/x/golive)
![dependencies](https://img.shields.io/badge/dependencies-1-green?style=flat&labelColor=000)
[![license](https://img.shields.io/github/license/shevernitskiy/amo?style=flat&labelColor=000)](https://github.com/shevernitskiy/amo/blob/main/LICENSE)
[![downloads](https://img.shields.io/github/downloads/shevernitskiy/golive/total?style=flat&labelColor=000)](https://img.shields.io/github/downloads/shevernitskiy/golive/total?labelColor=black)

# 🔴golive

**golive** is a simple stream script/bot notifier. But it can do a bit more than similar common services.

It tracks your channels on stream platforms and makes an _updatable_ nice looking posts in your social networks and
messaging services with actual stream info and preview image. After the stream, it deletes the post.

#### Supported streaming platforms:

- Twitch
- VK Live
- Trovo

#### Supported messaging services:

- Telegram
- Discord

## How it works

The core of **golive** is a simple script. When it runs, it goes to streaming platforms, fetch info about the stream.
Then, if there is no announcement about this stream, it creates a new one. If there is an announcement , it updates it
with actual data. If there is the announcement , but the stream has been ended, the post wiil be deleted.

## How to use it

- Standalone executable on your machine
  ([tutorial](https://github.com/shevernitskiy/golive/blob/main/docs/standalone.md))
- _Deno Deploy_ worker ([tutorial](https://github.com/shevernitskiy/golive/blob/main/docs/deploy.md))
- Run code with _Deno_ directly.

## Configuration

Configuration detailes described [here](https://github.com/shevernitskiy/golive/blob/main/docs/configuration.md)

## Showcase

<table align="center">
  <tr>
    <td valign="top">

### Telegram announce

<img width="345" alt="image" src="https://github.com/shevernitskiy/golive/assets/28886342/f7ce8163-988d-4888-b7db-10808b9f1ccf">
    </td>
    <td valign="top">

### Discord announce

<img width="329" alt="image" src="https://github.com/shevernitskiy/golive/assets/28886342/c43ac18e-c119-4550-b21d-68d3af72b6dc">
    </td>
  </tr>
</table>

# Contribution

Pull request, issues and feedback are very welcome. Code style is formatted with deno fmt.

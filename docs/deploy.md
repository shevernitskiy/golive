# Deno deploy

**golive** can be hosted on [_Deno Deploy_](https://dash.deno.com/). It's totally free.

Instructions:

1. If don't have an account on [_Deno Deploy_](https://dash.deno.com/), get it.
2. Fork **golive** repository to have your own copy.
3. In your Deno Deploy dashboard select `Create a project` from exixsting GitHub repository
   - select the forked repository on your account
   - select `main` branch
   - select `No build step`
   - select `server.ts` entry point
4. Go to `Settings` tab in freshly created project in a dahsboard
5. Add `enviroment variables` to switch on target functionality (available variables presented in
   [`.env.example`](https://github.com/shevernitskiy/golive/blob/main/.env.example)). More info in
   [configuration](https://github.com/shevernitskiy/golive/blob/main/docs/configuration.md) guide.
6. If the stream is online, you can already check it out by clicking the main url of the project
   (https://_project-name_.deno.dev) in the `Overview` tab of the dashboard
7. You will find `Cron` tab in dashboard where you can ensure that cronjob appeard.

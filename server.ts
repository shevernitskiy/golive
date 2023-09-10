import { app } from "./src/app.ts";

Deno.serve(async () => {
  await app();
  return new Response("Ok");
});

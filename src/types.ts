import type { Source } from "./core/source.ts";
import type { Target } from "./core/target.ts";

export type Config = {
  source_order: string[];
  db: Deno.Kv;
  telegram: {
    token?: string;
    channel_id?: number;
    template: string;
  };
  discord: {
    token?: string;
    channel_id?: string;
    template: string;
  };
  twitch: {
    channel?: string;
  };
  vk: {
    channel?: string;
  };
  trovo: {
    channel?: string;
  };
};

// possible uses
export type Middleware = Source | Target;

export type StreamInfo = {
  online: boolean;
  title: string;
  category: string;
  start_time: number;
  preview: string;
  viewers: number;
  likes?: number;
};

export type PostId = number | string;

export type SourceState = {
  id: PostId;
};

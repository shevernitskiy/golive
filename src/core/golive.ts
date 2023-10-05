import { Source } from "./source.ts";
import { Target } from "./target.ts";
import type { Config, Middleware, PostId, StreamInfo } from "../types.ts";
import { State } from "./state.ts";
import { info } from "./logger.ts";

export class GoLive {
  private sources: Source[] = [];
  private targets: Target[] = [];
  private state: State;

  constructor(private readonly config: Config) {
    this.state = new State(config.db);
  }

  use(middleware: Middleware): void {
    if (middleware instanceof Source) {
      this.sources.push(middleware);
    } else if (middleware instanceof Target) {
      this.targets.push(middleware);
    }
  }

  async execute(): Promise<void> {
    const info = await this.fetch_stream_info();
    if (!info?.online) {
      await this.delete_posts();
    } else {
      await this.update_posts(info);
    }
  }

  shutdown(): void {
    this.config.db.close();
  }

  private async fetch_stream_info(): Promise<StreamInfo | undefined> {
    let info: StreamInfo | undefined;
    for (const source of this.sources) {
      info = await source.fetch();
      if (info === undefined) continue;
      if (info && info.online) return info;
    }
    return info;
  }

  private async delete_posts(): Promise<void> {
    for (const target of this.targets) {
      const state = await this.state.get_target(target.name);
      if (!state || state.id === 0 || state.id === "0") {
        continue;
      } else {
        const result = await target.delete(state.id);
        if (result) {
          info(`[${target.name}] deleting post, id: ${state.id}`);
          const id = typeof state.id === "number" ? 0 : "0";
          await this.state.set_target(target.name, { id: id });
        }
      }
    }
  }

  private async update_posts(stream_info: StreamInfo): Promise<void> {
    for (const target of this.targets) {
      const state = await this.state.get_target(target.name);
      let postid: PostId;
      if (!state || state.id === 0 || state.id === "0") {
        postid = await target.create(stream_info);
        info(`[${target.name}] creating post, id: ${postid}`);
      } else {
        postid = await target.update(stream_info, state.id);
      }
      await this.state.set_target(target.name, { id: postid });
    }
  }
}

import { error } from "../core/logger.ts";
import { Source } from "../core/source.ts";
import { StreamInfo } from "../types.ts";

export class Vk extends Source {
  readonly name = "vk";

  constructor(private readonly channel: string) {
    super();
  }

  async fetch(): Promise<StreamInfo | undefined> {
    try {
      const res = await fetch(`https://api.vkplay.live/v1/blog/${this.channel}/public_video_stream`);
      const data = await res.json();
      if (data?.error || !res) return undefined;

      return {
        online: data.isOnline,
        title: data.title ?? "No title",
        category: data.category?.title ?? "No category",
        start_time: data.startTime,
        preview: data.previewUrl,
        viewers: data.count?.viewers,
        likes: data.count?.likes,
      };
    } catch (err) {
      error(`[${this.name}] undable to fetch data from vk api: ${err}`);
      return undefined;
    }
  }
}

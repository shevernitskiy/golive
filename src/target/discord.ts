import { error } from "../core/logger.ts";
import { Target } from "../core/target.ts";
import { PostId, StreamInfo } from "../types.ts";

const API_ENDPOINT = "https://discord.com/api/v10" as const;

export class Discord extends Target {
  readonly name = "discord";

  constructor(private readonly token: string, private readonly channel_id: string, private readonly template: string) {
    super();
  }

  private resolve_template(info: StreamInfo): string {
    const diff = (Date.now() / 1000) - info.start_time;
    const hours = ~~(diff / 3600);
    const minutes = ~~((diff - hours * 3600) / 60);
    const seconds = ~~(diff - hours * 3600 - minutes * 60);
    const duration = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${
      seconds.toString().padStart(2, "0")
    }`;

    return this.template
      .replaceAll("{url}", info.channel_url)
      .replaceAll("{title}", info.title)
      .replaceAll("{category}", info.category)
      .replaceAll("{viewers}", info.viewers.toString())
      .replaceAll("{duration}", duration)
      .replaceAll("{preview}", info.preview + `?dt=${Date.now()}`);
  }

  async request<T>(method: string, url: string, data?: unknown): Promise<T> {
    const res = await fetch(`${API_ENDPOINT}/${url}`, {
      method: method,
      body: JSON.stringify({
        tts: false,
        embeds: [data],
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bot ${this.token}`,
      },
    });
    return res.body ? await res.json() as T : null as T;
  }

  async create(stream_info: StreamInfo): Promise<PostId> {
    try {
      const res = await this.request<{ id: string }>(
        "POST",
        `/channels/${this.channel_id}/messages`,
        JSON.parse(this.resolve_template(stream_info)),
      );
      if (!res?.id) {
        error(`[${this.name}] field on post create`);
      }
      return res?.id ?? "0";
    } catch (err) {
      error(`[${this.name}] field on post create: ${err}`);
      return 0;
    }
  }

  async update(stream_info: StreamInfo, id: PostId): Promise<PostId> {
    try {
      const res = await this.request<{ id: string }>(
        "PATCH",
        `/channels/${this.channel_id}/messages/${id}`,
        JSON.parse(this.resolve_template(stream_info)),
      );
      if (!res?.id) {
        error(`[${this.name}] field on post create`);
      }
      return res?.id ?? "0";
    } catch (err) {
      error(`[${this.name}] field on post create: ${err}`);
      return 0;
    }
  }

  async delete(id: PostId): Promise<boolean> {
    try {
      await this.request<unknown>("DELETE", `/channels/${this.channel_id}/messages/${id}`);
      return true;
    } catch (err) {
      error(`[${this.name}] field on post delete: ${err}`);
      return false;
    }
  }
}

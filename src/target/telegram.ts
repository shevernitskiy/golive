import { error } from "../core/logger.ts";
import { Target } from "../core/target.ts";
import { PostId, StreamInfo } from "../types.ts";

const API_ENDPOINT = "https://api.telegram.org" as const;

export class Telegram extends Target {
  readonly name = "telegram";

  constructor(
    private readonly token: string,
    private readonly channel_id: number,
    private readonly template: string,
    private readonly button?: string,
  ) {
    super();
  }

  private async request<T>(method: string, data: unknown): Promise<T> {
    const res = await fetch(`${API_ENDPOINT}/bot${this.token}/${method}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json() as T;
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
      .replaceAll("{title}", info.title)
      .replaceAll("{category}", info.category)
      .replaceAll("{viewers}", info.viewers.toString())
      .replaceAll("{duration}", duration);
  }

  async create(stream_info: StreamInfo): Promise<PostId> {
    try {
      const res = await this.request<{ ok: boolean; result: { message_id: number } }>("sendPhoto", {
        chat_id: this.channel_id,
        caption: this.resolve_template(stream_info),
        parse_mode: "HTML",
        photo: `${stream_info.preview}?dt=${Date.now()}`,
        reply_markup: this.button
          ? {
            inline_keyboard: [[
              { text: this.button, url: stream_info.channel_url },
            ]],
          }
          : undefined,
      });
      if (!res.ok) {
        error(`[${this.name}] field on post create`);
      }
      return res.result?.message_id ?? 0;
    } catch (err) {
      error(`[${this.name}] field on post create: ${err}`);
      return 0;
    }
  }

  async update(stream_info: StreamInfo, id: PostId): Promise<PostId> {
    try {
      const res = await this.request<{ ok: boolean; result: { message_id: number } }>("editMessageMedia", {
        chat_id: this.channel_id,
        message_id: Number(id),
        media: {
          type: "photo",
          media: `${stream_info.preview}?dt=${Date.now()}`,
          caption: this.resolve_template(stream_info),
          parse_mode: "HTML",
        },
        reply_markup: this.button
          ? {
            inline_keyboard: [[
              { text: this.button, url: stream_info.channel_url },
            ]],
          }
          : undefined,
      });
      if (!res.ok) {
        error(`[${this.name}] field on post update`);
      }
      return res.result?.message_id ?? 0;
    } catch (err) {
      error(`[${this.name}] field on post update: ${err}`);
      return id;
    }
  }

  async delete(id: PostId): Promise<boolean> {
    try {
      await this.request<unknown>("deleteMessage", {
        chat_id: this.channel_id,
        message_id: id,
      });
      return true;
    } catch (err) {
      error(`[${this.name}] field on post delete: ${err}`);
      return false;
    }
  }
}

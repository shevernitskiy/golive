import { error } from "../core/logger.ts";
import { Source } from "../core/source.ts";
import { ChannelUrl, StreamInfo } from "../types.ts";

const GQL_URL = "https://api-web.trovo.live/graphql" as const;

export class Trovo extends Source {
  readonly name = "trovo";

  private channel_url: ChannelUrl;

  constructor(private readonly channel: string) {
    super();
    this.channel_url = `https://trovo.live/s/${channel}`;
  }

  async fetch(): Promise<StreamInfo | undefined> {
    try {
      const data = await this.gql(
        [this.request.LiveReaderService_GetLiveInfo(this.channel)],
      );
      return this.response.StreamInfo(data);
    } catch (_err) {
      error(`[${this.name}] unbale to fetch data from twitch api`);
      return undefined;
    }
  }

  private async gql(execute: unknown[]): Promise<unknown[]> {
    try {
      const res = await fetch(GQL_URL + `?qid=${Date.now()}`, {
        method: "POST",
        body: JSON.stringify(execute),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }

  private request = {
    LiveReaderService_GetLiveInfo: (channel: string) => {
      return {
        operationName: "live_LiveReaderService_GetLiveInfo",
        variables: {
          params: {
            userName: channel,
            requireDecorations: true,
          },
        },
        extensions: {},
      };
    },
  };

  private response = {
    // deno-lint-ignore no-explicit-any
    StreamInfo: (data: any): StreamInfo => {
      const prefix = data.at(0)?.data?.live_LiveReaderService_GetLiveInfo;
      return {
        online: prefix?.isLive === 1,
        viewers: prefix?.channelInfo?.viewers,
        category: prefix?.categoryInfo?.name ?? "No Category",
        title: prefix?.programInfo?.title ?? "No Title",
        start_time: prefix?.programInfo?.startTm,
        preview: prefix?.programInfo?.screenShotUrl,
        channel_url: this.channel_url,
      };
    },
  };
}

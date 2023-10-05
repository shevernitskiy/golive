import { error } from "../core/logger.ts";
import { Source } from "../core/source.ts";
import { ChannelUrl, StreamInfo } from "../types.ts";

const GQL_URL = "https://gql.twitch.tv/gql" as const;
const CLIENT_ID = "kimne78kx3ncx6brgo4mv6wki5h1ko" as const;

export class Twitch extends Source {
  readonly name = "twitch";

  private channel_url: ChannelUrl;

  constructor(private readonly channel: string) {
    super();
    this.channel_url = `https://www.twitch.tv/${channel}`;
  }

  async fetch(): Promise<StreamInfo | undefined> {
    try {
      const data = await this.gql(
        [
          this.request.VideoPlayerStatusOverlayChannel(this.channel),
          this.request.UseViewCount(this.channel),
          this.request.ComscoreStreamingQuery(this.channel),
          this.request.NielsenContentMetadata(this.channel),
          this.request.VideoPreviewOverlay(this.channel),
        ],
      );
      return this.response.StreamInfo(data);
    } catch (_err) {
      error(`[${this.name}] unbale to fetch data from twitch api`);
      return undefined;
    }
  }

  private async gql(execute: unknown[]): Promise<unknown[]> {
    try {
      const res = await fetch(GQL_URL, {
        headers: { "Client-Id": CLIENT_ID },
        method: "POST",
        body: JSON.stringify(execute),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      throw err;
    }
  }

  private ext(sha: string, version = 1) {
    return {
      extensions: {
        persistedQuery: {
          version: version,
          sha256Hash: sha,
        },
      },
    };
  }

  private request = {
    SearchResultsPage_SearchResults: (query: string) => {
      return {
        operationName: "SearchResultsPage_SearchResults",
        variables: {
          query: query,
          options: null,
          requestID: crypto.randomUUID(),
        },
        ...this.ext("6ea6e6f66006485e41dbe3ebd69d5674c5b22896ce7b595d7fce6411a3790138"),
      };
    },
    VideoPreviewOverlay: (login: string) => {
      return {
        operationName: "VideoPreviewOverlay",
        variables: {
          login: login,
        },
        ...this.ext("3006e77e51b128d838fa4e835723ca4dc9a05c5efd4466c1085215c6e437e65c"),
      };
    },
    VideoPlayerStatusOverlayChannel: (channel: string) => {
      return {
        operationName: "VideoPlayerStatusOverlayChannel",
        variables: {
          channel: channel,
        },
        ...this.ext("938d155c890df88b5da53592e327d36ae9b851d2ee38bdb13342a1402fc24ad2"),
      };
    },
    UseViewCount: (channel: string) => {
      return {
        operationName: "UseViewCount",
        variables: {
          channelLogin: channel,
        },
        ...this.ext("00b11c9c428f79ae228f30080a06ffd8226a1f068d6f52fbc057cbde66e994c2"),
      };
    },
    ComscoreStreamingQuery: (channel: string) => {
      return {
        operationName: "ComscoreStreamingQuery",
        variables: {
          channel: channel,
          clipSlug: "",
          isClip: false,
          isLive: true,
          isVodOrCollection: false,
          vodID: "",
        },
        ...this.ext("e1edae8122517d013405f237ffcc124515dc6ded82480a88daef69c83b53ac01"),
      };
    },
    NielsenContentMetadata: (login: string) => {
      return {
        operationName: "NielsenContentMetadata",
        variables: {
          isCollectionContent: false,
          isLiveContent: true,
          isVODContent: false,
          collectionID: "",
          login: login,
          vodID: "",
        },
        ...this.ext("2dbf505ee929438369e68e72319d1106bb3c142e295332fac157c90638968586"),
      };
    },
  };

  private response = {
    // deno-lint-ignore no-explicit-any
    StreamInfo: (data: any): StreamInfo => {
      return {
        online: data[0].data.user?.stream?.type === "live",
        viewers: data[1].data.user?.stream?.viewersCount,
        category: data[2].data.user?.stream?.game?.name ?? "No Category",
        title: data[2].data.user?.broadcastSettings?.title ?? "No Title",
        start_time: new Date(data[2].data.user?.stream?.createdAt).getTime() / 1000,
        preview: data[4].data.user?.stream?.previewImageURL,
        channel_url: this.channel_url,
      };
    },
  };
}

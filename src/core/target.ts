import { PostId, StreamInfo } from "../types.ts";

export abstract class Target {
  abstract name: string;

  abstract update(stream_info: StreamInfo, id: PostId): Promise<PostId>;
  abstract create(stream_info: StreamInfo): Promise<PostId>;
  abstract delete(id: PostId): Promise<void>;
}

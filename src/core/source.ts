import type { StreamInfo } from "../types.ts";

export abstract class Source {
  abstract name: string;

  abstract fetch(): Promise<StreamInfo | undefined>;
}

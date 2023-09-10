import { SourceState } from "../types.ts";

export class State {
  constructor(private db: Deno.Kv) {}

  async get_target(name: string): Promise<SourceState | undefined> {
    const res = await this.db.get<SourceState>(["target", name]);
    return res.value ?? undefined;
  }

  async set_target(name: string, state: SourceState): Promise<void> {
    await this.db.set(["target", name], state);
  }
}

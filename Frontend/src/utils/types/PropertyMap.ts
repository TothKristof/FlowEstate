import type { Snapshot } from "./Snapshot";
import type { Edge } from "./Edge";

export interface PropertyMap{
    videoPublicId: string,
    snapshots: Snapshot[],
    edges: Edge[]
}
import type { Snapshot } from "./Snapshot";
import type { Edge } from "./Edge";

export interface PropertyMap{
    snapshots: Snapshot[],
    edges: Edge[]
}
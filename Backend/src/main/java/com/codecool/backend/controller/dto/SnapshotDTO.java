package com.codecool.backend.controller.dto;

import com.codecool.backend.model.Snapshot;

public record SnapshotDTO(
        String id,
        String snapshotUrl,
        double timestamp
) {
    public SnapshotDTO(Snapshot snapshot) {
        this(snapshot.getUuid(),snapshot.getSnapshotUrl(), snapshot.getTimestamp());
    }
}

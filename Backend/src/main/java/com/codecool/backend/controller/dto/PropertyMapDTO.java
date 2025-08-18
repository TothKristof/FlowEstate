package com.codecool.backend.controller.dto;

import com.codecool.backend.model.Edge;
import com.codecool.backend.model.PropertyMap;
import com.codecool.backend.model.Snapshot;

import java.util.List;

public record PropertyMapDTO(
        String videoPublicId,
        List<SnapshotDTO> snapshots,
        List<EdgeDTO> edges
) {
    public PropertyMapDTO(PropertyMap map) {
        this(
                map.getVideoPublicId(),
                map.getSnapshots() != null
                        ? map.getSnapshots().stream()
                        .map(SnapshotDTO::new)
                        .toList()
                        : List.of(),
                map.getEdges() != null
                        ? map.getEdges().stream()
                        .map(EdgeDTO::new)
                        .toList()
                        : List.of()
        );
    }
}


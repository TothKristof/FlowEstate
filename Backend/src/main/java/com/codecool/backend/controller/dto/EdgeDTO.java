package com.codecool.backend.controller.dto;

import com.codecool.backend.model.Edge;

public record EdgeDTO(
        String from,
        String to,
        String videoSegmentUrl
) {
    public EdgeDTO(Edge edge) {
        this(edge.getFrom(),
                edge.getTo(),
                edge.getVideoSegmentUrl());
    }
}

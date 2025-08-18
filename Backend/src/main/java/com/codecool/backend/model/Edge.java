package com.codecool.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Edge {
    @Id
    @GeneratedValue
    private Long id;
    @Column(name = "from_id")
    private String from;
    @Column(name = "to_id")
    private String to;
    private String videoSegmentUrl;
}

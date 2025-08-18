package com.codecool.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class PropertyMap {
    @Id
    @GeneratedValue
    private Long id;

    private String videoPublicId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "property_map_id")
    private List<Snapshot> snapshots;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "property_map_id")
    private List<Edge> edges;

}

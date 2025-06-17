package com.codecool.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class PropertyImage {
    @Id
    @GeneratedValue
    private Long id;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
}

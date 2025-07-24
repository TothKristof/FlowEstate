package com.codecool.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public class Room {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Double> points;

    private String color;

    @OneToOne(cascade = CascadeType.ALL)
    private PropertyImage imageUrl;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;
}


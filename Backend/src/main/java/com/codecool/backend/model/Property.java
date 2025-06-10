package com.codecool.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Property {
    @Id
    @GeneratedValue
    private Long id;
    private double price;
    private double area;
    private int roomCount;
    private double pricePerArea;
    @OneToOne
    private Location location;
    private String description;
    @Enumerated(EnumType.STRING)
    private Condition condition;
    private int builtYear;
}

package com.codecool.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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
    private boolean sell;
    @Enumerated(EnumType.STRING)
    private PropertyType propertyType;
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PropertyImage> images = new ArrayList<>();
}

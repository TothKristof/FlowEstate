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
    private String blueprintUrl;
    @Enumerated(EnumType.STRING)
    private PropertyType propertyType;
    private String imageFolderId;
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<PropertyImage> images = new ArrayList<>();
    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Room> rooms = new ArrayList<>();
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private List<PropertyBenefit> benefits = new ArrayList<>();
    private String thumbnailImageUrl;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private PropertyMap propertyMap;
}

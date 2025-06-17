package com.codecool.backend.controller.dto;

import com.codecool.backend.model.*;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.stream.Collectors;

public record PropertyDTO(
        Long id,
        String owner_name,
        String owner_phone,
        double area,
        int built_year,
        double price,
        int room_count,
        boolean sell,
        Condition condition,
        @JsonProperty("property_type") PropertyType propertyType,
        LocationDTO location,
        List<String> imageUrls
) {
    public PropertyDTO(Property property) {
        this(
                property.getId(),
                null, // owner_name: not present in Property; clarify source
                null, // owner_phone: not present in Property; clarify source
                property.getArea(),
                property.getBuiltYear(),
                property.getPrice(),
                property.getRoomCount(),
                property.isSell(),
                property.getCondition(),
                property.getPropertyType(),
                property.getLocation() != null ? new LocationDTO(
                        property.getLocation().getId(),
                        property.getLocation().getStreet(),
                        property.getLocation().getCity(),
                        property.getLocation().getHouseNumber(),
                        property.getLocation().getZipCode()

                ) : null,
                property.getImages().stream()
                        .map(PropertyImage::getImageUrl)
                        .collect(Collectors.toList())
        );
    }
}
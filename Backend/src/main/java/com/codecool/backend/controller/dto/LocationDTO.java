package com.codecool.backend.controller.dto;

import com.codecool.backend.model.Location;

public record LocationDTO(
        Long id,
        String street,
        String city,
        String houseNumber,
        int zipCode
) {
    public LocationDTO(Location location) {
        this(
                location.getId(),
                location.getStreet(),
                location.getCity(),
                location.getHouseNumber(),
                location.getZipCode()
        );
    }
}

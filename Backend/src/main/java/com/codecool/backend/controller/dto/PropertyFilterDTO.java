package com.codecool.backend.controller.dto;

import com.codecool.backend.model.Condition;
import com.codecool.backend.model.PropertyType;

public record PropertyFilterDTO(
        Double minPrice,
        Double maxPrice,
        Integer minRooms,
        Integer maxRooms,
        Boolean sell,
        PropertyType propertyType,
        Condition condition,
        String city
) {}
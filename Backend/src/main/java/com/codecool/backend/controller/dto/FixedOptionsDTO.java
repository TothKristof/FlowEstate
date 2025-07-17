package com.codecool.backend.controller.dto;

import com.codecool.backend.model.Condition;
import com.codecool.backend.model.PropertyType;

import java.util.List;

public record FixedOptionsDTO(List<String> conditions, List<String> propertyTypes) {
}

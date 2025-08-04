package com.codecool.backend.controller.dto;

import com.codecool.backend.model.Location;
import com.codecool.backend.model.PropertyBenefit;

public record BenefitDTO(String name, String icon) {
    public BenefitDTO(PropertyBenefit benefit) {
        this(
                benefit.getDisplayName(),
                benefit.getIconName()
        );
    }
}

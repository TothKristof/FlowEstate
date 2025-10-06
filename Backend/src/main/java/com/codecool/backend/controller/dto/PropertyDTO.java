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
        String condition,
        @JsonProperty("property_type") String propertyType,
        LocationDTO location,
        String blueprintUrl,
        String imageFolderId,
        List<String> imageUrls,
        List<RoomDTO> rooms,
        List<BenefitDTO> benefits,
        String thumbnailImageUrl,
        PropertyMapDTO propertyMap
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
                property.getCondition().getDisplayedName(),
                property.getPropertyType().getDisplayedName(),
                property.getLocation() != null ? new LocationDTO(
                        property.getLocation().getId(),
                        property.getLocation().getStreet(),
                        property.getLocation().getCity(),
                        property.getLocation().getHouseNumber(),
                        property.getLocation().getZipCode()
                ) : null,
                property.getBlueprintUrl(),
                property.getImageFolderId(),
                property.getImages().stream()
                        .map(PropertyImage::getImageUrl)
                        .collect(Collectors.toList()),
                property.getRooms().stream()
                        .map(r -> new RoomDTO(r.getName(), r.getColor(), r.getPoints(),
                                r.getImageUrl() != null ? r.getImageUrl().getImageUrl() : null))
                        .collect(Collectors.toList()),
                property.getBenefits().stream()
                        .map(b -> new BenefitDTO(b.getDisplayName(), b.getIconName()))
                        .collect(Collectors.toList()),
                property.getThumbnailImageUrl(),
                property.getPropertyMap() != null ? new PropertyMapDTO(property.getPropertyMap()) : null
        );
    }

}
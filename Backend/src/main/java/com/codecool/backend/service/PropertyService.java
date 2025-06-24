package com.codecool.backend.service;

import com.codecool.backend.controller.dto.FixedOptionsDTO;
import com.codecool.backend.controller.dto.PropertyDTO;
import com.codecool.backend.controller.dto.PropertyFilterDTO;
import com.codecool.backend.model.*;
import com.codecool.backend.repository.LocationRepository;
import com.codecool.backend.repository.PropertyRepository;
import com.codecool.backend.security.service.OAuth2SuccessHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;
    private final LocationRepository locationRepository;

    private static final Logger logger = LoggerFactory.getLogger(PropertyService.class);

    public PropertyService(PropertyRepository propertyRepository, LocationRepository locationRepository){
        this.propertyRepository=propertyRepository;
        this.locationRepository = locationRepository;
    }

    public Page<PropertyDTO> getAllProperty(int page, int size){
        Pageable pageable = PageRequest.of(page, size);

        return propertyRepository.findAll(pageable)
                .map(PropertyDTO::new);
    }

    public FixedOptionsDTO getFixedOptions() {
        List<Condition> conditions = Arrays.stream(Condition.values()).toList();
        List<PropertyType> propertyTypes = Arrays.stream(PropertyType.values()).toList();
        return new FixedOptionsDTO(conditions,propertyTypes);
    }

    public void uploadProperty(PropertyDTO property) {
        logger.info(property.toString());
        logger.info(property.location().toString());

        Location location = new Location();
        location.setCity(property.location().city());
        location.setStreet(property.location().street());
        location.setHouseNumber(property.location().houseNumber());
        location.setZipCode(property.location().zipCode());
        locationRepository.save(location);

        Property newProperty = new Property();
        newProperty.setPropertyType(property.propertyType());
        newProperty.setArea(property.area());
        newProperty.setPrice(property.price());
        newProperty.setCondition(property.condition());
        newProperty.setSell(property.sell());
        newProperty.setBuiltYear(property.built_year());
        newProperty.setLocation(location);
        newProperty.setRoomCount(property.room_count());

        if (property.imageUrls() != null) {
            List<PropertyImage> images = property.imageUrls().stream()
                    .map(url -> {
                        PropertyImage image = new PropertyImage();
                        image.setImageUrl(url);
                        image.setProperty(newProperty);
                        return image;
                    })
                    .toList();
            newProperty.setImages(images);
        }

        propertyRepository.save(newProperty);
    }

    public Page<PropertyDTO> getFilteredProperty(int page, int size, PropertyFilterDTO filter){
        Pageable pageable = PageRequest.of(page, size);
        Specification<Property> spec = PropertySpecification.withFilters(filter);

        return propertyRepository.findAll(spec, pageable)
                .map(PropertyDTO::new);
    }
}

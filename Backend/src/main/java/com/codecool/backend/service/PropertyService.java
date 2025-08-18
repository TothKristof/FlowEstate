package com.codecool.backend.service;

import com.codecool.backend.controller.dto.BenefitDTO;
import com.codecool.backend.controller.dto.FixedOptionsDTO;
import com.codecool.backend.controller.dto.PropertyDTO;
import com.codecool.backend.controller.dto.PropertyFilterDTO;
import com.codecool.backend.exception.PropertyNotFound;
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
        List<String> conditions = Arrays.stream(Condition.values())
                .map(Condition::getDisplayedName)
                .toList();

        List<String> propertyTypes = Arrays.stream(PropertyType.values())
                .map(PropertyType::getDisplayedName)
                .toList();

        List<BenefitDTO> benefits = Arrays.stream(PropertyBenefit.values()).map(BenefitDTO::new).toList();

        return new FixedOptionsDTO(conditions, propertyTypes, benefits);
    }

    public Long uploadProperty(PropertyDTO property) {
        logger.info(property.toString());
        logger.info(property.location().toString());

        Location location = new Location();
        location.setCity(property.location().city());
        location.setStreet(property.location().street());
        location.setHouseNumber(property.location().houseNumber());
        location.setZipCode(property.location().zipCode());
        locationRepository.save(location);

        Property newProperty = new Property();
        newProperty.setPropertyType(PropertyType.fromDisplayedName(property.propertyType()));
        newProperty.setArea(property.area());
        newProperty.setPrice(property.price());
        newProperty.setCondition(Condition.fromDisplayedName(property.condition()));
        newProperty.setSell(property.sell());
        newProperty.setBuiltYear(property.built_year());
        newProperty.setLocation(location);
        newProperty.setRoomCount(property.room_count());
        newProperty.setBlueprintUrl(property.blueprintUrl());
        newProperty.setThumbnailImageUrl(property.thumbnailImageUrl());
        newProperty.setImageFolderId(property.imageFolderId());

        // Images
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

        // Rooms
        if (property.rooms() != null) {
            List<Room> rooms = property.rooms().stream()
                    .map(dto -> {
                        Room room = new Room();
                        room.setName(dto.name());
                        room.setColor(dto.color());
                        room.setPoints(dto.points());
                        room.setProperty(newProperty);


                        if (dto.imageUrl() != null && !dto.imageUrl().isEmpty() && newProperty.getImages() != null) {
                            PropertyImage image = newProperty.getImages().stream()
                                    .filter(img -> img.getImageUrl().equals(dto.imageUrl()))
                                    .findFirst()
                                    .orElse(null);
                            room.setImageUrl(image);
                        }

                        return room;
                    })
                    .toList();
            newProperty.setRooms(rooms);
        }

        if (property.benefits() != null) {
            List<PropertyBenefit> benefits = property.benefits().stream()
                    .map(dto -> PropertyBenefit.fromDisplayName(dto.name()))
                    .toList();
            newProperty.setBenefits(benefits);
        }

        if (property.propertyMap() != null) {
            PropertyMap map = new PropertyMap();
            map.setVideoPublicId(property.propertyMap().videoPublicId());

            map.setSnapshots(
                    property.propertyMap().snapshots().stream()
                            .map(dto -> {
                                Snapshot snapshot = new Snapshot();
                                snapshot.setUuid(dto.id());
                                snapshot.setSnapshotUrl(dto.snapshotUrl());
                                snapshot.setTimestamp(dto.timestamp());
                                return snapshot;
                            })
                            .toList()
            );

            map.setEdges(
                    property.propertyMap().edges().stream()
                            .map(dto -> {
                                Edge edge = new Edge();
                                edge.setFrom(dto.from());
                                edge.setTo(dto.to());
                                edge.setVideoSegmentUrl(dto.videoSegmentUrl());
                                edge.setReverseUrl(dto.reverseUrl());
                                return edge;
                            })
                            .toList()
            );
            newProperty.setPropertyMap(map);
        }


        return propertyRepository.save(newProperty).getId();
    }


    public Page<PropertyDTO> getFilteredProperty(int page, int size, PropertyFilterDTO filter){
        Pageable pageable = PageRequest.of(page, size);
        Specification<Property> spec = PropertySpecification.withFilters(filter);

        return propertyRepository.findAll(spec, pageable)
                .map(PropertyDTO::new);
    }

    public PropertyDTO getPropertyById(Long id) {
        Property searchedProperty = propertyRepository.findById(id).orElseThrow(PropertyNotFound::new);
        return new PropertyDTO(searchedProperty);
    }


}

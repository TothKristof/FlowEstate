package com.codecool.backend.service;

import com.codecool.backend.controller.dto.*;
import com.codecool.backend.exception.PropertyNotFound;
import com.codecool.backend.model.*;
import com.codecool.backend.repository.LocationRepository;
import com.codecool.backend.repository.PropertyRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PropertyServiceTest {

    @Mock
    private PropertyRepository propertyRepository;

    @Mock
    private LocationRepository locationRepository;

    @InjectMocks
    private PropertyService propertyService;

    @Test
    void getAllProperty_shouldReturnPageOfPropertyDTOs() {
        Pageable pageable = PageRequest.of(0, 10);

        Property property = new Property();
        property.setPrice(860000000);
        property.setArea(50);
        property.setCondition(Condition.EXCELLENT);
        property.setPropertyType(PropertyType.APARTMENT);
        property.setPropertyMap(new PropertyMap());

        Page<Property> propertyPage = new PageImpl<>(List.of(property), pageable, 1);
        when(propertyRepository.findAll(pageable)).thenReturn(propertyPage);

        Page<PropertyDTO> result = propertyService.getAllProperty(0, 10);

        assertEquals(1, result.getTotalElements());
        assertEquals(860000000, result.getContent().get(0).price());
        verify(propertyRepository).findAll(pageable);
    }

    @Test
    void getFixedOptions_shouldReturnAllEnumValuesMapped() {
        FixedOptionsDTO options = propertyService.getFixedOptions();

        assertEquals(Condition.values().length, options.conditions().size());
        assertEquals(PropertyType.values().length, options.propertyTypes().size());
        assertEquals(PropertyBenefit.values().length, options.benefits().size());

        // spot check a couple of values
        assertTrue(options.conditions().contains(Condition.EXCELLENT.getDisplayedName()));
        assertTrue(options.propertyTypes().contains(PropertyType.APARTMENT.getDisplayedName()));
        assertTrue(options.benefits().stream().anyMatch(b -> b.name().equals(PropertyBenefit.BALCONY.getDisplayName())));
    }

    @Test
    void uploadProperty_shouldMapAndPersistAndReturnGeneratedId() {
        LocationDTO locationDTO = new LocationDTO(null, "Main St", "Budapest", "12A", 12345);
        List<String> imageUrls = Arrays.asList("img1.jpg", "img2.jpg");
        List<RoomDTO> rooms = List.of(new RoomDTO("Living Room", "#ffffff", List.of(0.0, 1.0, 2.0), "img2.jpg"));
        List<BenefitDTO> benefits = List.of(new BenefitDTO(PropertyBenefit.BALCONY.getDisplayName(), PropertyBenefit.BALCONY.getIconName()));
        PropertyMapDTO map = new PropertyMapDTO(
                "video-123",
                List.of(new SnapshotDTO("s1", "snap1.jpg", 0.5)),
                List.of(new EdgeDTO("s1", "s2", "seg1.mp4", "rev1.mp4"))
        );

        PropertyDTO dto = new PropertyDTO(
                null,
                null,
                null,
                75.0,
                2005,
                123456.0,
                3,
                true,
                Condition.EXCELLENT.getDisplayedName(),
                PropertyType.APARTMENT.getDisplayedName(),
                locationDTO,
                "blueprint.png",
                "folder-xyz",
                imageUrls,
                rooms,
                benefits,
                "thumb.jpg",
                map
        );

        when(locationRepository.save(any(Location.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(propertyRepository.save(any(Property.class))).thenAnswer(invocation -> {
            Property p = invocation.getArgument(0);
            p.setId(42L);
            return p;
        });

        Long id = propertyService.uploadProperty(dto);

        assertEquals(42L, id);

        ArgumentCaptor<Property> propertyCaptor = ArgumentCaptor.forClass(Property.class);
        verify(propertyRepository).save(propertyCaptor.capture());
        Property saved = propertyCaptor.getValue();

        assertEquals(PropertyType.APARTMENT, saved.getPropertyType());
        assertEquals(Condition.EXCELLENT, saved.getCondition());
        assertEquals(75.0, saved.getArea());
        assertEquals(123456.0, saved.getPrice());
        assertEquals(3, saved.getRoomCount());
        assertTrue(saved.isSell());
        assertEquals("blueprint.png", saved.getBlueprintUrl());
        assertEquals("folder-xyz", saved.getImageFolderId());
        assertEquals("thumb.jpg", saved.getThumbnailImageUrl());

        assertNotNull(saved.getLocation());
        assertEquals("Budapest", saved.getLocation().getCity());

        assertEquals(2, saved.getImages().size());
        assertTrue(saved.getImages().stream().anyMatch(img -> img.getImageUrl().equals("img1.jpg")));
        assertTrue(saved.getImages().stream().anyMatch(img -> img.getImageUrl().equals("img2.jpg")));

        assertEquals(1, saved.getRooms().size());
        Room savedRoom = saved.getRooms().get(0);
        assertEquals("Living Room", savedRoom.getName());
        assertNotNull(savedRoom.getImageUrl());
        assertEquals("img2.jpg", savedRoom.getImageUrl().getImageUrl());
        assertSame(saved, savedRoom.getProperty());

        assertNotNull(saved.getPropertyMap());
        assertEquals("video-123", saved.getPropertyMap().getVideoPublicId());
        assertEquals(1, saved.getPropertyMap().getSnapshots().size());
        assertEquals(1, saved.getPropertyMap().getEdges().size());

        assertEquals(1, saved.getBenefits().size());
        assertEquals(PropertyBenefit.BALCONY, saved.getBenefits().get(0));

        verify(locationRepository).save(any(Location.class));
    }

    @Test
    void getFilteredProperty_shouldApplySpecificationAndReturnDTOs() {
        Pageable pageable = PageRequest.of(0, 5);

        Property property = new Property();
        property.setArea(100);
        property.setPrice(250000);
        property.setRoomCount(4);
        property.setSell(false);
        property.setCondition(Condition.GOOD);
        property.setPropertyType(PropertyType.HOUSE);
        property.setPropertyMap(new PropertyMap());

        Page<Property> propertyPage = new PageImpl<>(List.of(property), pageable, 1);
        when(propertyRepository.findAll(any(Specification.class), any(Pageable.class))).thenReturn(propertyPage);

        PropertyFilterDTO filter = new PropertyFilterDTO(100000.0, 300000.0, 3, 5, false, PropertyType.HOUSE, Condition.GOOD, "Budapest");

        Page<PropertyDTO> result = propertyService.getFilteredProperty(0, 5, filter);

        assertEquals(1, result.getTotalElements());
        assertEquals(250000, result.getContent().get(0).price());
        verify(propertyRepository).findAll(any(Specification.class), any(Pageable.class));
    }

    @Test
    void getPropertyById_shouldReturnDTO_whenExists() {
        Property property = new Property();
        property.setId(7L);
        property.setArea(60);
        property.setPrice(200000);
        property.setCondition(Condition.NEW);
        property.setPropertyType(PropertyType.OFFICE);
        property.setPropertyMap(new PropertyMap());

        when(propertyRepository.findById(7L)).thenReturn(Optional.of(property));

        PropertyDTO dto = propertyService.getPropertyById(7L);

        assertEquals(7L, dto.id());
        assertEquals(200000, dto.price());
        assertEquals(Condition.NEW.getDisplayedName(), dto.condition());
        assertEquals(PropertyType.OFFICE.getDisplayedName(), dto.propertyType());
        verify(propertyRepository).findById(7L);
    }

    @Test
    void getPropertyById_shouldThrow_whenNotFound() {
        when(propertyRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(PropertyNotFound.class, () -> propertyService.getPropertyById(99L));
        verify(propertyRepository).findById(99L);
    }
}
package com.codecool.backend.controller;

import com.codecool.backend.model.Property;
import com.codecool.backend.service.PropertyService;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/property")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("/all")
    public List<Property> getAllProperty() {
        return propertyService.getAllProperty();
    }
}

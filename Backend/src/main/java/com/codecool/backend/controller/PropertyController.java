package com.codecool.backend.controller;

import com.codecool.backend.controller.dto.FixedOptionsDTO;
import com.codecool.backend.controller.dto.PropertyDTO;
import com.codecool.backend.model.Condition;
import com.codecool.backend.model.Property;
import com.codecool.backend.model.PropertyType;
import com.codecool.backend.service.PropertyService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/property")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping("/all")
    public Page<PropertyDTO> getItems(@RequestParam(defaultValue = "0") int page,
                                   @RequestParam(defaultValue = "10") int size) {
        return propertyService.getAllProperty(page, size);
    }

    @GetMapping("/options")
    public FixedOptionsDTO getFixedOptions(){
        return propertyService.getFixedOptions();
    }

    @PostMapping("/upload")
    public void uploadProperty(@RequestBody PropertyDTO property){
        propertyService.uploadProperty(property);
    }
}

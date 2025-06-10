package com.codecool.backend.service;

import com.codecool.backend.model.Property;
import com.codecool.backend.repository.PropertyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyService {
    private final PropertyRepository propertyRepository;

    public PropertyService(PropertyRepository propertyRepository){
        this.propertyRepository=propertyRepository;
    }

    public List<Property> getAllProperty(){
        return propertyRepository.findAll();
    }
}

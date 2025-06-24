package com.codecool.backend.model;

import com.codecool.backend.controller.dto.PropertyFilterDTO;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.criteria.Predicate;

public class PropertySpecification {

    public static Specification<Property> withFilters(PropertyFilterDTO request) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (request.minPrice() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"), request.minPrice()));
            }
            if (request.maxPrice() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("price"), request.maxPrice()));
            }
            if (request.minRooms() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("roomCount"), request.minRooms()));
            }
            if (request.maxRooms() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("roomCount"), request.maxRooms()));
            }
            if (request.sell() != null) {
                predicates.add(cb.equal(root.get("sell"), request.sell()));
            }
            if (request.propertyType() != null) {
                predicates.add(cb.equal(root.get("propertyType"), request.propertyType()));
            }
            if (request.condition() != null) {
                predicates.add(cb.equal(root.get("condition"), request.condition()));
            }
            if (request.city()!= null && !request.city().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("location").get("city")), "%" + request.city().toLowerCase() + "%"));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}


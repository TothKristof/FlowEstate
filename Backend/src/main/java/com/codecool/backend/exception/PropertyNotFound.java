package com.codecool.backend.exception;

public class PropertyNotFound extends RuntimeException {
    public PropertyNotFound() {
        super("Property not found");
    }
}

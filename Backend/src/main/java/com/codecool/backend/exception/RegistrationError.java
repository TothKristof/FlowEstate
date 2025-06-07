package com.codecool.backend.exception;

public class RegistrationError extends RuntimeException {
    public RegistrationError() {
        super("Registration process failed!");
    }
}

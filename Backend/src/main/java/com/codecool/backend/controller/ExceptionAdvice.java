package com.codecool.backend.controller;

import com.codecool.backend.exception.RegistrationError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionAdvice {
    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RegistrationError.class)
    public String illegalRequestParameterExceptionHandler(RegistrationError exception) {
        return exception.getMessage();
    }
}

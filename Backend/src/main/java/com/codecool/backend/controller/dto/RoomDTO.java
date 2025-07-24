package com.codecool.backend.controller.dto;

import java.util.List;

public record RoomDTO(String name, String color, List<Double> points, String imageUrl) {
}

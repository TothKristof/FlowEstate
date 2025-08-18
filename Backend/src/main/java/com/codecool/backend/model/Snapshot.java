package com.codecool.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Snapshot {
    @Id
    @GeneratedValue
    private Long id;
    private String uuid;
    private double timestamp;
    @Lob
    private String snapshotUrl;
}

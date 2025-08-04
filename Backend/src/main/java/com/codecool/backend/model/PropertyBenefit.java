package com.codecool.backend.model;

public enum PropertyBenefit {
    BALCONY("Balcony", "FaRegBuilding"),
    GARDEN("Garden", "FaTree"),
    GARAGE("Garage", "FaCar"),
    AIR_CONDITIONING("Air Conditioning", "FaSnowflake"),
    ELEVATOR("Elevator", "FaArrowUp"),
    FURNISHED("Furnished", "FaCouch"),
    SWIMMING_POOL("Swimming Pool", "FaSwimmer"),
    PANORAMIC_VIEW("Panoramic View", "FaMountain"),
    SOLAR_PANELS("Solar Panels", "FaSolarPanel");

    private final String displayName;
    private final String iconName;

    PropertyBenefit(String displayName, String iconName) {
        this.displayName = displayName;
        this.iconName = iconName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getIconName() {
        return iconName;
    }

    @Override
    public String toString() {
        return displayName;
    }

    public static PropertyBenefit fromDisplayName(String displayName) {
        for (PropertyBenefit benefit : values()) {
            if (benefit.displayName.equalsIgnoreCase(displayName)) {
                return benefit;
            }
        }
        throw new IllegalArgumentException("Unknown display name: " + displayName);
    }
}

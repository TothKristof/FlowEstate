package com.codecool.backend.model;

public enum PropertyType {
    APARTMENT("Apartment"),             // Lakás
    HOUSE("House"),                     // Ház
    LAND("Land"),                       // Telek
    HOLIDAY_HOME("Holiday Home"),       // Nyaraló
    OFFICE("Office"),                   // Iroda
    SHOP("Shop"),                       // Üzlethelyiség
    INDUSTRIAL("Industrial"),           // Ipari
    AGRICULTURAL("Agricultural"),       // Mezőgazdasági
    HOSPITALITY("Hospitality"),         // Vendéglátás
    GARAGE("Garage"),                   // Garázs
    DEVELOPMENT_AREA("Development Area"), // Fejlesztési terület
    INSTITUTION("Institution"),         // Intézmény
    WAREHOUSE("Warehouse");             // Raktár

    private final String displayedName;

    PropertyType(String displayedName) {
        this.displayedName = displayedName;
    }

    public String getDisplayedName() {
        return displayedName;
    }

    public static PropertyType fromDisplayedName(String name) {
        for (PropertyType type : PropertyType.values()) {
            if (type.displayedName.equalsIgnoreCase(name)) {
                return type;
            }
        }
        return null;
    }
}

package com.codecool.backend.model;

public enum Condition {
    NEW("New"),
    EXCELLENT("Excellent"),
    GOOD("Good"),
    NEEDS_RENOVATION("Needs Renovation"),
    UNDER_CONSTRUCTION("Under Construction");

    private final String displayedName;

    Condition(String displayedName) {
        this.displayedName = displayedName;
    }

    public String getDisplayedName() {
        return displayedName;
    }


    public static Condition fromDisplayedName(String name) {
        for (Condition condition : Condition.values()) {
            if (condition.displayedName.equalsIgnoreCase(name)) {
                return condition;
            }
        }
        return null;
    }
}

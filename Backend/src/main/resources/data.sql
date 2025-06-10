-- Location tábla feltöltése (minden Property-nek kell egy Location)
INSERT INTO location (id, country, city, street, house_number, zip_code)
VALUES
    (1, 'Hungary', 'Budapest', 'Kossuth Lajos utca', '12', 1053),
    (2, 'Hungary', 'Debrecen', 'Bem tér', '5', 4026),
    (3, 'Hungary', 'Szeged', 'Tisza Lajos körút', '25', 6720);

-- Property tábla feltöltése
INSERT INTO property (id, price, area, room_count, price_per_area, location_id, description, condition, built_year)
VALUES
    (1, 75000000.00, 85.5, 3, 877192.98, 1, 'Modern lakás Budapest belvárosában, kiváló állapotban.', 'EXCELLENT', 2018),
    (2, 45000000.00, 60.0, 2, 750000.00, 2, 'Felújítandó lakás Debrecenben, csendes környéken.', 'NEEDS_RENOVATION', 1975),
    (3, 120000000.00, 120.0, 4, 1000000.00, 3, 'Új építésű ház Szegeden, azonnal költözhető.', 'NEW', 2024);
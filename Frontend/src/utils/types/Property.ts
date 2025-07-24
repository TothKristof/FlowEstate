import type { Room } from "./Room"

export interface Property{
    id: number | null,
    owner_name: string | null,
    owner_phone: string | null,
    area: number | null,
    built_year: number | null,
    price: number | null,
    room_count: number | null,
    sell: boolean,
    condition: string | null,
    property_type: string | null,
    location: {
      city: string | null,
      street: string | null,
      houseNumber: string | null,
      zipCode: number | null,
    },
    blueprintUrl: string | null,
    imageUrls: string[] | null
    rooms: Room[]
  };
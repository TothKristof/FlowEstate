import type { Room } from "./Room"
import type { Benefit } from "./Benefit"
import type { PropertyMap } from "./PropertyMap"

export interface Property{
    owner_name: string,
    owner_phone: string,
    area: number,
    built_year: number,
    price: number,
    room_count: number,
    sell: boolean,
    condition: string,
    property_type: string,
    location: {
      city: string,
      street: string,
      houseNumber: string,
      zipCode: number,
    },
    blueprintUrl?: string,
    imageFolderId?: string,
    imageUrls?: string[]
    rooms?: Room[],
    benefits?: Benefit[],
    thumbnailImageUrl?: string,
    propertyMap: PropertyMap
  };
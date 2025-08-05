 export interface Filter{
    minPrice?: number,
    maxPrice?: number,
    minRooms?: number,
    maxRooms?: number,
    sell?: boolean,
    propertyType?: string,
    condition?: string,
    city?: string,
  }
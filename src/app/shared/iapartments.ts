export interface IApartments{
  id: string,
  favorite: boolean,
  name: string,
  email: string,
  apartment: {
    id: string,
    location: string,
    info: string,
    latlng: {
      lat: number,
      lng: number
    },
    images: [
        string
    ],
    phones: [string],
    apartment_type: string,
    rooms: number,
    parking: number,
    balcony: number,
    mamad: boolean,
    elevator: boolean,
    air_conditioner: boolean,
    tama: boolean,
    reconditioned: boolean,
    bars: boolean,
    master_room: boolean,
    storage: boolean,
    gym: boolean,
    furniture: boolean,
    pets: boolean,
    roomates: boolean,
    immediate_entrance: boolean,
    apartment_image: boolean,
    price: number,
    size: number,
    floor: number,
    entrence_date: string,
    toilets: number
  }
}
export class Apartment {
constructor(
    public id : string,
    public publisher: {
        name:string,
        email:string,
        phones: Array<string>,
        type:string
    },
    public location: {
        coordinates:  Array<string>
    },
    public details?: {
        apartment_type: Array<string>,
        rooms: number,
        size: number,
        floor: number,
        toilets: number,
        info: string,
        price: number,
        entrance_date: string,
        images: Array<string>,
        address: string
    },
    public filters?:{
        parking:boolean,
        balcony:boolean,
        mamad:boolean,
        elevator:boolean,
        air_conditioner:boolean,
        tama:boolean,
        reconditioned:boolean,
        bars:boolean,
        master_room:boolean,
        storage:boolean,
        gym:boolean,
        furniture:boolean,
        pets:boolean,
        roommates:boolean,
        immediate_entrance:boolean,
        apartment_image:boolean,
    }
  ){}
}

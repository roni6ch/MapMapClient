export class Apartment {
 /*   constructor(
        public name: string,
        public phone: string,
        public price: number,
        public email: string,
        public date: Date,
        public description: string,
        public images?: {},
        public filters?: {}
      ) {  }
}
*/
constructor(
    public info: string,
    public price: number,
    public entrance_date: string,
    public publisher: {
        user_id: string,
        phone: Array<string>
    },
    public location: {
        name: string,
        latlng: {
              lat: number,
              lng: number
        }
    },
    public images?: string,
    public details?: {
        apartmentType: Array<string>,
        rooms: number,
        size: number,
        floor: number,
        toilets: number,
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
/*
export class Filters{
    constructor(
    filters:{
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
}*/
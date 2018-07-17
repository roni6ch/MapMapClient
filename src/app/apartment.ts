export class Apartment {
    constructor(
        public name: string,
        public phone: string,
        public price: number,
        public email: string,
        public date: Date,
        public description: string,
        public images?: [string],
        public filters?: [boolean]
      ) {  }
}

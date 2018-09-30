export class Filters {
    constructor(
        public favorites: boolean,
        public advanced_filters: {},
        public range : [string,string],
        public apartment_type : string,
        public rooms : number,
        public floor : number,
        public toilets : number,
        public images : boolean,

      ) {  }
}

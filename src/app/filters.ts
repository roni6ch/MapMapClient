export class Filters {
    constructor(
        public favorites: boolean,
        public advanced_filters: {},
        public range : [string,string],
        public apartmentType : string,
        public rooms : number,
        public floor : number,
        public toilets : number,
        public images : boolean,

      ) {  }
}

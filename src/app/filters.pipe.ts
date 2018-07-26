import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(apartments: any, filtersArr: any): any {
    if (filtersArr === undefined || filtersArr.length == 0) return apartments;

    let apratmentsArr = [];
    let apratmentsArrAdvancedFilters = [];
    apartments.filter(function (a) {
      //filter by range
      //todo: change active to favorites
      if (Number(filtersArr.range[0]) <= a.details.price && a.details.price <= Number(filtersArr.range[1])
        && ( filtersArr.favorites == a.active  || !filtersArr.favorites )
        && ( filtersArr.apartment_type == a.details.apartment_type || filtersArr.apartment_type == 'all')
        && Number(a.details.rooms) >= filtersArr.rooms 
        && Number(a.details.floor) >= filtersArr.floor
        && Number(a.details.toilets) >= filtersArr.toilets) {
          //filter by apartments with images
          if (filtersArr.images && a.details.images.length > 0 )
            apratmentsArr.push(a);
          else if (!filtersArr.images )
            apratmentsArr.push(a);
      }
    });
    if (filtersArr.advanced_filters.length > 0) {
      apratmentsArr.filter(function (a) {
        let passAllFilters = true;
        
      //filter by filters
        filtersArr.advanced_filters.forEach((f, i) => {
          if (a.filters[f.filterName] == false)
              passAllFilters = false;
        })
        if (passAllFilters)
         apratmentsArrAdvancedFilters.push(a);
      });
      
      return apratmentsArrAdvancedFilters;
    }
    return apratmentsArr;

  }

}

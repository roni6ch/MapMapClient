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
      if (Number(filtersArr.range[0]) <= a.apartment.price && a.apartment.price <= Number(filtersArr.range[1])
        && filtersArr.favorites == a.favorite) {
        apratmentsArr.push(a);
      }
    });
    if (filtersArr.advanced_filters.length > 0) {
      apratmentsArr.filter(function (a) {
        let passAllFilters = true;
        filtersArr.advanced_filters.forEach((f, i) => {
          if (a.apartment[f.filterName] == false)
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

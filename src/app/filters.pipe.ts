import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(apartments: any, filtersArr: any): any {
    if (filtersArr === undefined) return apartments;

    let apratmentsArr = [];
    if (filtersArr.length > 0){
       apartments.filter(function(a){
        filtersArr.forEach((f, i) =>  {
        if (a.apartment[f.filterName])
        apratmentsArr.push(a);
      })
    });
    return apratmentsArr;
  }

    
    
     else return apartments;
    
  }

}

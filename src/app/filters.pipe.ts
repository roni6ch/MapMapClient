import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters'
})
export class FiltersPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log("value: " , value);
    console.log("args: " , args);
    if (args === "advancedFilter")
    {
      value.forEach(function (f, i, value) {
        //console.log(f); 
      });
    }
      return null;
    
  }

}

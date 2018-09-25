import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe'
})
export class DatePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var date = new Date(value);
    if (value !== null)
      return date.toLocaleDateString();
    return null;
  }

}

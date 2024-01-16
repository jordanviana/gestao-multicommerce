import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'dateBrSimples'})

export class DateBrSimplesPipe implements PipeTransform {
  transform(value: string): string {
   try {
     return value.substr(0, 10).split('-').reverse().join('/');
   } catch (error) {
    return "--/--/----"
   }
  }
}

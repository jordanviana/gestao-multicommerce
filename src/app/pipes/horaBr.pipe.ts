import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'horaBr'})
export class HoraBr implements PipeTransform {
  transform(value: string): string {
    if(!value) return "às 00:00";
    let data = new Date(value)
    let hora = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
    let min = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
    return `às ${hora}:${min}`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dataHoraBr'})
export class DataHoraBr implements PipeTransform {
  transform(value: string): string {
    if(!value) return "--/--/---- às 00:00";
    let data = new Date(value)
    let hora = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
    let min = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
    let seg = data.getSeconds() < 10 ? "0" + data.getSeconds() : data.getSeconds();
    let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
    let mes = (data.getMonth() + 1) < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1);
    let ano = data.getFullYear();
    return `${dia}/${mes}/${ano} às ${hora}:${min}`;
  }
}

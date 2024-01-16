import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  show = false;
  showEmpresas = false;
  constructor() { }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends ApiService {

  public lista(pagina, porpagina, busca) {
    return this.get(`/marca/${pagina}/${porpagina}/${busca}`);
  }

  public getOne(id) {
    return this.get(`/marca/${id}`);
  }

  public delete(id) {
    return this.get(`/marca/delete/${id}`);
  }

  public novo(dados) {
    return this.post(`/marca/novo`, dados);
  }

}

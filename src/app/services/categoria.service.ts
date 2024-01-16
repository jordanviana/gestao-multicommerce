import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends ApiService {

  public lista(pagina, porpagina, busca) {
    return this.get(`/categoria/${pagina}/${porpagina}/${busca}`);
  }

  public getOne(id) {
    return this.get(`/categoria/${id}`);
  }

  public delete(id) {
    return this.get(`/categoria/delete/${id}`);
  }

  public novo(dados) {
    return this.post(`/categoria/novo`, dados);
  }

}


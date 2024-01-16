import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService extends ApiService{

  
  public lista(pagina, porpagina, busca) {
    return this.get(`/subcategoria/${pagina}/${porpagina}/${busca}`);
  }

  public getOne(id) {
    return this.get(`/subcategoria/${id}`);
  }

  public delete(id) {
    return this.get(`/subcategoria/delete/${id}`);
  }

  public novo(dados) {
    return this.post(`/subcategoria/novo`, dados);
  }


}
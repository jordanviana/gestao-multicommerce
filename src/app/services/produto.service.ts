import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends ApiService {

  
  public lista(pagina, porpagina, busca) {
    return this.get(`/produto/${pagina}/${porpagina}/${busca}`);
  }

  public getOne(id) {
    return this.get(`/produto/${id}`);
  }

  public delete(id) {
    return this.get(`/produto/delete/${id}`);
  }

  public novo(dados) {
    return this.post(`/produto/novo`, dados);
  }

  public setImage(dados){
    return this.post(`/produto/imagem/set`, dados)
  }
}

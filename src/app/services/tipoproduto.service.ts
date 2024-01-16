import { ApiService } from 'src/app/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoprodutoService extends ApiService {

  
  public lista(pagina, porpagina, busca) {
    return this.get(`/tipoproduto/${pagina}/${porpagina}/${busca}`);
  }

  public getOne(id) {
    return this.get(`/tipoproduto/${id}`);
  }
  
  public delete(id) {
    return this.get(`/tipoproduto/delete/${id}`);
  }

  public novo(dados) {
    return this.post(`/tipoproduto/novo`, dados);
  }

}

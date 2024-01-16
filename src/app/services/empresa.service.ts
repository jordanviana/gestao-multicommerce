import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})

export class EmpresaService extends ApiService {
  getEmpresas(busca, porpagina, pagina = 0){
    if(pagina < 0) pagina = 0
    return this.get(`/empresa/${pagina}/${porpagina}/${busca}`)
  }
  getEmpresasEstadium(){
    return this.get(`/empresa/empresasestadium`)
  }

  getEmpresasAcesso(){
    return this.get(`/empresa/getconfigacesso`)
  }

  getConfig(){
    return this.get(`/empresa/config`)
  }


  updateFutConfig(dados){
    return this.post('/empresa/esporte/config', dados)
  }

  getOne(id){
    return this.get(`/empresa/${id}`)
  }

  getEmpresasConfigEstadium(){
    return this.get(`/estadium/configacessos`)
  }

  insertConfigsAcessosStadium(dados){
    return this.post(`/estadium/configacessos/insert`, dados)
  }

  novoSocio(dados){
    return this.post(`/estadium/novosocio`, dados)
  }

}

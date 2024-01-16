import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ApiService {

  loadingEmpresa = false;


  login(username, senha) {
    return this.post('/login', { username, senha });
  }

  loginV2(username, senha) {
    return this.post('/v2/login', { username, senha });
  }

  lista(pagina, porpagina, busca, estadium) {
    if (estadium) return this.get(`/usuarioestadium/${pagina}/${porpagina}/${busca}`);
    else return this.get(`/usuario/${pagina}/${porpagina}/${busca}`);
  }

  listaRecolhe(pagina, porpagina, busca) {
    return this.get(`/usuario/recolhe/${pagina}/${porpagina}/${busca}`);
  }

  public getConfig() {
    return this.get(`/usuario/config`);
}

  public validausername(username) {
    return this.post(`/usuario/validausername`, username);
  }

  public getOne(id) {
    return this.get(`/usuario/${id}`);
}


  public novo(usuario) {
    return this.post(`/usuario/novo`, usuario);
  }

  alterarempresa(index, ) {
    return this.get('/usuario/alterarempresa/' + index);
  }

  public updateSenha(usuario) {
    return this.post(`/usuario/updatesenha`, usuario);
  }



  getEmpresas() {
    this.carregaSessao();
    try {
      return this.sessao.usuario.empresas;
    } catch (error) {
      return []
    }
  }

  async setAlteraEmpresa(index) {
    this.loadingEmpresa = true;
    try {
      let data = await this.alterarempresa(index);
      this.salveSessao(data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    // window.location.reload();
    this.loadingEmpresa = false;
  }
}

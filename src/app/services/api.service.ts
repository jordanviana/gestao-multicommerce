import { Injectable, isDevMode } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NotificacaoService } from "./notificacao.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  servidor = "";
  sessao = null;

  constructor(
    private http: HttpClient,
    public router: Router,
    public notificacao: NotificacaoService
  ) {


    if (isDevMode()) this.servidor = "http://localhost:3003"
    this.servidor = "http://localhost:3003"
  }


  getHorariosCidadeLogada(){
    try {
      this.carregaSessao();
      let horarios = {};
      for(let _horarios of this.sessao.usuario.empresa.dias.map( dia => dia.horarios)){
        for(let h of _horarios){
          horarios[h.extracao] = h;
        }
      }
      return Object.keys(horarios).map( h => horarios[h]);
    } catch (error) {
      return [];
    }
  }


  getSessao() {
    try {
      let sessao = JSON.parse(localStorage.getItem("sessao"));
      return sessao;
    } catch (error) {
      return null;
    }
  }

  errorRest(error) {
    this.notificacao.erroRest(error);
  }

  getParams(params) {
    let resp = "";
    for (let i in params) {
      let type = typeof params[i];
      let value = params[i];
      let str = `${i}: ${type == "string" ? `"${value}"` : `${value}`}
      `;
      resp += str;
    }
    return resp;
  }

  limpaSessao() {
    localStorage.removeItem("sessao");
    this.carregaSessao();
  }

  salveSessao(usuario) {
    localStorage.setItem("sessao", JSON.stringify(usuario));
    this.carregaSessao();
  }

  carregaSessao() {
    this.sessao = this.getSessao();
  }

  headers() {
    let sessao = this.getSessao() || {};
    let empresa = '';
    if(sessao && sessao.usuario && sessao.usuario.empresa && sessao.usuario.empresa._id)
      empresa = sessao.usuario.empresa._id;
    let { token } = sessao;
    return {
      headers: new HttpHeaders({
        token: token || "",
        empresa
      }),
    };
  }

  async get(url) {
    try {

      let request = await this.http
        .get(this.servidor + url, this.headers())
        .toPromise();
      if(isDevMode()){
        console.log(url);
        // console.log(request);
      }
      return request;
    } catch (error) {
      this.erroConsoleLog(error);
      throw error;
    }
  }

  async post(url, data) {
    try {
      let request = await this.http
        .post(this.servidor + url, data, this.headers())
        .toPromise();
      if(isDevMode()){
        console.log(url, data);
        console.log(request);
      }
      return request;
    } catch (error) {
      this.erroConsoleLog(error);
      throw error;
    }
  }

  // async delete(url) {
  //   try {
  //     let request = await this.http
  //     .delete(this.servidor + url, this.headers())
  //     .toPromise();
  //     if(isDevMode()){
  //       console.log(url);
  //       console.log(request);
  //     }
  //   } catch (error) {
  //     this.erroConsoleLog(error);
  //     throw error;
  //   }
  // }

  private erroConsoleLog(error) {
    if(error && error.status && error.status == 403){
      this.router.navigate(['/logoff'])
    }
    if (isDevMode()) {
      if (error && error.error && error.error.msg) {
        console.error(error.error.msg);
      } else {
        console.error(error);
      }
    }
  }

}

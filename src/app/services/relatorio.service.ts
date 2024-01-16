import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService extends ApiService {

  data = {
    tag: "div",
    html: "test",
    class: "testando",
    childrens: [
      {
        tag: "h1",
        html: "Titulo",
        class: "",
        // childrens: []
      }
    ]
  }
  teste;

  newWindows(path = "") {
    let host = window.location.origin;
    window.open(host + path, "", "width=1000,height=600");
  }
  async openRelatorio(path, post, idrelatorio) {
    let data: any = await this.post(path, post);
    localStorage.setItem('_relatorio_' + idrelatorio, JSON.stringify(data.relatorio));
    this.newWindows("/relatorios?id=" + idrelatorio);
  }
  relatorioGeral(data, sessao, extracao) {
    return this.get(`/relatorio/geraldel/${data}/${sessao}/${extracao}`);
  }
  bolos() {
    return this.get(`/bolo/bolosmatriz`);
  }
  getSessoesMapaBolo() {
    return this.get('/sessao/associados-bolo');
  }
  getMapaBolo(bolo) {
    return this.get(`/bolo-mapa/mapa/${bolo}`);
  }
  getMapaPost(dados) {
    return this.post(`/bolo/mapa-post`, dados);
  }
  
  getCobrancaPdf(dados) {
    return this.post(`/stadium/gestao/relatorio/guiacobrancapdf`, dados);
  }
  
  rankingBolo(bolo) {
    return this.get(`/bolo-ranking/ranking/${bolo}`);
  }

  cobranca(dados) {
    return this.post(`/relatorio/cobranca`, dados);
  }
  
  geral_por_periodo(dados) {
    return this.post(`/relatorio/geral-periodo`, dados);
  }
  getTipoJogoEmpresa(id) {
    return this.get(`/empresa/configfull/${id}`);
  }
  rankingJB(obj) {
    return this.post(`/relatorio/ranking`, obj)
  }
  geralGR02(dados) {
    return this.post(`/relatorio/geral-02`, dados);
  }
  processamentoGR03(data) {
    return this.post(`/relatorio/processamentogr03`, data)
  }
  geralGR03(dados) {
    return this.post(`/relatorio/geral-03`, dados);
  }
  retornosessaoGR03(obj) {
    return this.post(`/relatorio/retornosessao-gr03`, obj)
  }
  getArrecadadores() {
    return this.get(`/arrecadadores`);
  }
  retornoPorArrecadador(obj) {
    return this.post(`/relatorio/retorno-por-arrecadador`, obj)
  }
  retornoPorBanca(obj) {
    return this.post(`/relatorio/retorno-por-banca`, obj)
  }
  resultadoDiaSessao(dados) {
    return this.post(`/relatorio/resultadodiasessao`, dados);
  }
  resultadoDia(dados) {
    return this.post(`/relatorio/resultado_dia`, dados);
  }
  caixa(data) {
    return this.post(`/relatorio/caixa`, data)
  }
  tipojogo(obj) {
    return this.post(`/relatorio/rel-tipo-jogo-ponto`, obj)
  }
  cobranca_cbr01(dados) {
    return this.post(`/relatorio/cobranca_cbr01`, dados);
  }
  geral04(dados) {
    return this.post(`/relatorio/geral-04`, dados)
  }
  geral05(dados) {
    return this.post(`/relatorio/geral-05 `, dados)
  }
  acompCC(dados) {
    return this.post(`/relatorio/acompanhamentocc`, dados)
  }
  premiosConf(dados) {
    return this.post(`/relatorio/premios-confirmados `, dados)
  }
  dispositivosVersao(dados) {
    return this.post(`/relatorio/dispositivos-versao`, dados)
  }
  levado(dados) {
    return this.post(`/relatorio/levado`, dados);
  }
  guiaMov(dados) {
    return this.post(`/guia_movimento`, dados)
  }
  geralPorPonto(dados) {
    return this.post(`/relatorio/geral-ponto `, dados)
  }
  geralPorSessao(dados) {
    return this.post(`/relatorio/geral-sessao`, dados);
  }
  pontosParados(dados) {
    return this.post(`/relatorio/pontos-parados`, dados)
  }
  cobrancaCBR03(dados) {
    return this.post(`/relatorio/cobranca03 `, dados)
  }
  geralGRF02(dados) {
    return this.post(`/relatorio/grf02`, dados);
  }
  geralGRF02gerentes(dados) {
    return this.post(`/relatorio/grf02gerentes`, dados);
  }
  cobrancaEsporte(dados) {
    return this.post(`/relatorio/cobranca-esportivo `, dados)
  }
}

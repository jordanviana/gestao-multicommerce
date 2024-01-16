import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'impressao',
  templateUrl: './impressao.component.html',
  styleUrls: ['./impressao.component.css']
})
export class ImpressaoComponent implements OnInit {

  header:any = []
  lista:any
  titulo: string = ""
  dataImpressao = new Date().toISOString()
  empresa
  sorteio:any
  listaPainel:any
  totais:any
  headerPainel:any

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.empresa = this.api.getSessao().usuario.empresa.nome
    this.header = JSON.parse(localStorage.getItem('headerTable'))
    this.lista = JSON.parse(localStorage.getItem('listaImpressao'))
    this.titulo = JSON.parse(localStorage.getItem('titulo'))
    this.listaPainel = JSON.parse(localStorage.getItem('listaPainel'))
    this.sorteio = JSON.parse(localStorage.getItem('sorteio'))
    this.totais = JSON.parse(localStorage.getItem('totais'))
    this.header = JSON.parse(localStorage.getItem('header'))
  }

  somaValores() {
    let soma = 0
    for (let i = 0; i < this.lista.length; i++) {
      soma += this.lista[i].valor
    }
    return soma
  }

}

import { Component, OnInit } from '@angular/core';
import { TipoprodutoService } from 'src/app/services/tipoproduto.service';

@Component({
  selector: 'app-tipoproduto',
  templateUrl: './tipoproduto.component.html',
  styleUrls: ['./tipoproduto.component.css']
})
export class TipoprodutoComponent implements OnInit {

  constructor(private tipoprodutoService: TipoprodutoService) { }

  loading = false
  lista = []
  total = 0
  title = "Tipos de produto"
  descricao = "Listando tipos de produtos"

  async ngOnInit() {
    this.loading = true
    await this.getLista()
    this.loading = false
  }

  async getLista(){
    try {
      let {lista}:any = await this.tipoprodutoService.lista(0, 5000, '')
      this.lista = lista
    } catch (error) {
      console.log(error)
      this.tipoprodutoService.errorRest(error)
    }
  }

  async delete(id){
    if (this.loading) return 1
    this.loading = true
    try {
      await this.tipoprodutoService.delete(id)
      await this.getLista()
    } catch (error) {
      this.tipoprodutoService.errorRest(error)
    }
    this.loading = false
  }
}

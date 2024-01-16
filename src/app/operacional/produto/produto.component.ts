import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  constructor(private produtoService: ProdutoService) { }

  loading = false
  lista = []
  total = 0
  title = "Produtos"
  descricao = "Listando produtos."

  async ngOnInit() {
    this.loading = true
    await this.getLista()
    this.loading = false
  }

  async getLista(){
    try {
      let {lista}:any = await this.produtoService.lista(0, 1000, '')
      this.lista = lista
    } catch (error) {
      console.log(error)
      this.produtoService.errorRest(error)
    }
  }

  async delete(id){
    if (this.loading) return 1
    this.loading = true
    try {
      await this.produtoService.delete(id)
      await this.getLista()
    } catch (error) {
      this.produtoService.errorRest(error)
    }
    this.loading = false
  }
  
}

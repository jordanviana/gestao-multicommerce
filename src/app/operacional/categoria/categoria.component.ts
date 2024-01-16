import { CategoriaService } from './../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  constructor(private categoriaService: CategoriaService) { }

  loading = false
  lista = []
  total = 0
  title = "Categorias"
  descricao = "Listando categorias."

  async ngOnInit() {
    this.loading = true
    await this.getLista()
    this.loading = false
  }

  async getLista(){
    try {
      let {lista}:any = await this.categoriaService.lista(0, 1000, '')
      this.lista = lista
    } catch (error) {
      console.log(error)
      this.categoriaService.errorRest(error)
    }
  }

  async delete(id){
    if (this.loading) return 1
    this.loading = true
    try {
      await this.categoriaService.delete(id)
      await this.getLista()
    } catch (error) {
      this.categoriaService.errorRest(error)
    }
    this.loading = false
  }

}

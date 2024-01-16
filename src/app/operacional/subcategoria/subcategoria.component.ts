import { SubcategoriaService } from './../../services/subcategoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styleUrls: ['./subcategoria.component.css']
})
export class SubcategoriaComponent implements OnInit {

  constructor(private subcategoriaService: SubcategoriaService) { }

  loading = false
  lista = []
  total = 0
  title = "Subcategorias"
  descricao = "Listando subcategorias"

  async ngOnInit() {
    this.loading = true
    await this.getLista()
    this.loading = false
  }

  async getLista(){
    try {
      let {lista}:any = await this.subcategoriaService.lista(0, 1000, '')
      this.lista = lista
    } catch (error) {
      console.log(error)
      this.subcategoriaService.errorRest(error)
    }
  }

  async delete(id){
    if (this.loading) return 1
    this.loading = true
    try {
      await this.subcategoriaService.delete(id)
      await this.getLista()
    } catch (error) {
      this.subcategoriaService.errorRest(error)
    }
    this.loading = false
  }
}

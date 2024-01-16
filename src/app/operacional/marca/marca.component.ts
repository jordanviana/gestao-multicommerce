import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  constructor(private marcaService: MarcaService) { }

  loading = false
  lista = []
  total = 0
  title = "Marcas"
  descricao = "Listando marcas."

  async ngOnInit() {
    this.loading = true
    await this.getLista()
    this.loading = false
  }

  async getLista(){
    try {
      let {lista}:any = await this.marcaService.lista(0, 1000, '')
      this.lista = lista
    } catch (error) {
      console.log(error)
      this.marcaService.errorRest(error)
    }
  }

  async delete(id){
    if (this.loading) return 1
    this.loading = true
    try {
      await this.marcaService.delete(id)
      await this.getLista()
    } catch (error) {
      this.marcaService.errorRest(error)
    }
    this.loading = false
  }
}

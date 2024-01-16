import { UtilService } from './../../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaService } from './../../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  constructor(private categoriaService: CategoriaService, private router: Router, private actroute: ActivatedRoute, private util: UtilService) { }
  loading = false
  id = ""
  public form = new FormGroup({
    nome: new FormControl("", Validators.required),
    destaque: new FormControl(false)
  })

  ngOnInit() {
    this.actroute.queryParamMap.subscribe((params: any) => {
      this.id = params.params['_id'] || ""
      if (this.id) this.getCategoria(this.id)
    })
  }

  async getCategoria(id){
    this.loading = true
    try {
      let dados = await this.categoriaService.getOne(id)
      if (dados) this.util.setValueControls(this.form, dados)
    } catch (error) {
      console.log(error)
    }
    this.loading = false
  }

  async salvar(){
    this.loading = true
    try {
      let values = this.form.value
      if (this.id) values._id = this.id
      await this.categoriaService.novo(values)
      this.categoriaService.notificacao.show('Categoria salva com sucesso!');
      this.router.navigate(["/operacional/categoria"])
      console.log(values)
    } catch (error) {
      this.categoriaService.errorRest(error)
      console.log(error)
    }
    this.loading = false
  }

}

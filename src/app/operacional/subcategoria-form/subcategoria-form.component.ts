import { CategoriaService } from './../../services/categoria.service';
import { UtilService } from './../../services/util.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubcategoriaService } from './../../services/subcategoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategoria-form',
  templateUrl: './subcategoria-form.component.html',
  styleUrls: ['./subcategoria-form.component.css']
})
export class SubcategoriaFormComponent implements OnInit {

  constructor(private subcategoriaService: SubcategoriaService, private categoriaService: CategoriaService, private router: Router, private actroute: ActivatedRoute, private util: UtilService) { }
  loading = false
  categorias = []
  id = ""
  public form = new FormGroup({
    nome: new FormControl("", Validators.required),
    nome_exibe: new FormControl("", Validators.required),
    categoria: new FormControl(""),
    nova_categoria: new FormControl(""),
    nova_categoria_nome_exibe: new FormControl(""),
    nova_categoria_destaque: new FormControl(false),
    destaque: new FormControl(false)
  })

  async ngOnInit() {
    this.loading = true
    await this.getCategorias()
    this.actroute.queryParamMap.subscribe(async (params: any) => {
      this.id = params.params['_id'] || ""
      if (this.id) await this.getSubcategoria(this.id)
    })
    this.loading = false
  }

  async getCategorias(){
    try {
      let {lista}:any = await this.categoriaService.lista(0, 1000, '')
      this.categorias = lista
    } catch (error) {
      console.log(error)
    }
  }
  async getSubcategoria(id){
    this.loading = true
    try {
      let dados:any = await this.subcategoriaService.getOne(id)
      if (dados){
        this.util.setValueControls(this.form, dados)
        this.form.controls['categoria'].patchValue(dados.categoria._id)
      }
    } catch (error) {
      console.log(error)
    }
    this.loading = false
  }

  async salvar(){
    if (this.loading) return 1
    this.loading = true
    try {
      let values = this.form.value
      if (!this.id && !values.nova_categoria && !values.categoria) throw {msg: "Falta selecionar categoria."}
      if (this.id) values._id = this.id
      await this.subcategoriaService.novo(values)
      this.subcategoriaService.notificacao.show('Categoria salva com sucesso!');
      this.router.navigate(["/operacional/subcategoria"])
      console.log(values)
    } catch (error) {
      console.log(error)
      this.subcategoriaService.errorRest(error)
    }
    this.loading = false
  }


}

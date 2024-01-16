import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { TipoprodutoService } from 'src/app/services/tipoproduto.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-tipoproduto-form',
  templateUrl: './tipoproduto-form.component.html',
  styleUrls: ['./tipoproduto-form.component.css']
})
export class TipoprodutoFormComponent implements OnInit {

  constructor(private subcategoriaService: SubcategoriaService, private categoriaService: CategoriaService, private router: Router, private actroute: ActivatedRoute, private util: UtilService, private tipoproduto: TipoprodutoService) { }
  loading = false
  categorias = []
  subcategorias = []
  filtered_subcategorias = []
  id = ""
  public form = new FormGroup({
    nome: new FormControl("", Validators.required),
    nome_exibe: new FormControl("", Validators.required),
    categoria: new FormControl(""),
    nova_categoria: new FormControl(""),
    nova_categoria_nome_exibe: new FormControl(""),
    nova_categoria_destaque: new FormControl(""),
    subcategoria: new FormControl(""),
    nova_subcategoria: new FormControl(""),
    nova_subcategoria_nome_exibe: new FormControl(""),
    nova_subcategoria_destaque: new FormControl(""),
    destaque: new FormControl(false)
  })

  async ngOnInit() {
    this.loading = true
    await this.getCategorias()
    await this.getSubCategorias()
    this.actroute.queryParamMap.subscribe(async (params: any) => {
      this.id = params.params['_id'] || ""
      if (this.id) await this.getTipoProduto(this.id)
    })
    this.loading = false
  }

  filterSubCats(id_categoria){
    this.filtered_subcategorias = this.subcategorias.filter(s => s.categoria._id == id_categoria)
  }

  async getCategorias(){
    try {
      let {lista}:any = await this.categoriaService.lista(0, 1000, '')
      this.categorias = lista
    } catch (error) {
      console.log(error)
    }
  }

  async getSubCategorias(){
    try {
      let {lista}:any = await this.subcategoriaService.lista(0, 1000, '')
      this.subcategorias = lista
    } catch (error) {
      console.log(error)
    }
  }

  async getTipoProduto(id){
    this.loading = true
    try {
      let dados:any = await this.tipoproduto.getOne(id)
      if (dados){
        this.util.setValueControls(this.form, dados)
        this.form.controls['categoria'].patchValue(dados.categoria._id)
        this.filterSubCats(dados.categoria._id)
        this.form.controls['subcategoria'].patchValue(dados.subcategoria._id)
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
      if (!values.categoria && !values.nova_categoria) throw {msg: "Falta selecionar categoria."} 
      if (!values.subcategoria && !values.nova_subcategoria) throw {msg: "Falta selecionar categoria."} 
      if (this.id) values._id = this.id
      await this.tipoproduto.novo(values)
      this.subcategoriaService.notificacao.show('Tipo de produto salvo com sucesso!');
      this.router.navigate(["/operacional/tipoproduto"])
      console.log(values)
    } catch (error) {
      console.log(error)
      this.tipoproduto.errorRest(error)
    }
    this.loading = false
  }
}

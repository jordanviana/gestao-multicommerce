import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css']
})
export class MarcaFormComponent implements OnInit {

  constructor(private marcaService: MarcaService, private router: Router, private actroute: ActivatedRoute, private util: UtilService, private categoriaService: CategoriaService) { }
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
    await this.getCategorias()
    this.actroute.queryParamMap.subscribe((params: any) => {
      this.id = params.params['_id'] || ""
      if (this.id) this.getMarca(this.id)
    })
  }

  async getCategorias(){
    this.loading = true
    try {
      let {lista}:any = await this.categoriaService.lista(0, 1000, '')
      this.categorias = lista
    } catch (error) {
      console.log(error)
    }
    this.loading = false
  }

  async getMarca(id){
    this.loading = true
    try {
      let dados:any = await this.marcaService.getOne(id)
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
    this.loading = true
    try {
      let values = this.form.value
      if (this.id) values._id = this.id
      await this.marcaService.novo(values)
      this.marcaService.notificacao.show('Marca salva com sucesso!');
      this.router.navigate(["/operacional/marca"])
      console.log(values)
    } catch (error) {
      this.marcaService.errorRest(error)
      console.log(error)
    }
    this.loading = false
  }

}

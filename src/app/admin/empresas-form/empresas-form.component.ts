import { UtilService } from './../../services/util.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.css']
})
export class EmpresasFormComponent implements OnInit {

  loading: boolean = false
  id = ""

  public formGroup = new FormGroup({
    cod: new FormControl("", Validators.required),
    nome: new FormControl("", Validators.required),
    ativo: new FormControl(false)
  })

  constructor(
    private empresaService: EmpresaService,
    private route: ActivatedRoute,
    private util: UtilService
  ) {

  }

  async ngOnInit() {
    this.id = "";
    this.route.queryParamMap.subscribe(async queryParams => {
      this.id = queryParams.get("_id");
      console.log(this.id);
      if(this.id){
        this.loading = true
        try {
          let data:any = await this.empresaService.getOne(this.id);
          this.util.setValueControls(this.formGroup, data);
        } catch (error) {
          this.empresaService.errorRest(error)
        }
        this.loading= false
      }
    })
  }


  async salvar() {
    this.loading = true
    try {
      let values = this.formGroup.value
      this.empresaService.notificacao.show('Salvo com sucesso!');
      window.history.back();
    } catch (error) {
      console.log(error)
      this.empresaService.errorRest(error)
    }
    this.loading = false
  }




}

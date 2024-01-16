import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../services/template.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public usuario: UsuarioService,
    private template: TemplateService
  ) { }

  descricao = `Cadastro e edição de ${this.template.getSite().getLabel('Usuários')}`
  title = `Novo(a) ${this.template.getSite().getLabel('Usuários')}`
  loading = false;
  public id = "";
  public empresas = [];
  public perfis = [];
  public formGroup = new FormGroup({
    nome: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required, Validators.minLength(4)], this.validateEmailNotTaken.bind(this)),
    senha: new FormControl("", [Validators.minLength(4)]),
    senha2: new FormControl("", [Validators.minLength(4)]),
    ativo: new FormControl(false),
    empresas: new FormArray([], this.validaDuplicadas),
  }, this.checkPasswords)


  async validateEmailNotTaken(control: FormControl) {
    try {
      if (this.id) return null;
      let data: any = await this.usuario.validausername({ username: control.value });
      return !data.usuarios ? null : { username: true };
    } catch (error) {
      console.log(error);
      return { username: true }
    }
  }

  getErros(campo = "") {
    if (campo) {
      let resp = {};
      for (let i in this.formGroup.controls[campo].errors || {}) {
        resp[i] = true;
      }
      return resp;
    }
    return this.formGroup.errors ? this.formGroup.errors : {};
  }


  async ngOnInit() {
    this.loading = true
    this.usuario.carregaSessao()
    let data: any = await this.usuario.getConfig();
    this.perfis = data.perfis_estadium;
    this.empresas = data.empresas_estadium;
    this.route.queryParamMap.subscribe( async (params: any) => {
      let _id = params.params['_id'] || "";
      if (_id) {
        this.id = _id
        await this.getPlano(_id);
      }
    });
    this.loading = false
  }

  addEmpresa(empresa = null, perfil = null, sessoes = []) {
    (this.formGroup.controls['empresas'] as FormArray)
      .push(new FormGroup({
        empresa: new FormControl(empresa, [Validators.required]),
        perfil: new FormControl(perfil, [Validators.required]),
        sessoes: new FormControl(sessoes)
      }))
  }


  removeEmpresa(index) {
    (this.formGroup.controls['empresas'] as FormArray)
      .removeAt(index)
  }

  validaDuplicadas(array: FormArray) {
    let index = {};
    for (let control of array.controls) {
      let empresa = (control as FormGroup).controls['empresa'] as FormControl;
      let perfil = (control as FormGroup).controls['perfil'] as FormControl;
      if (!empresa.value || !perfil.value) continue;
      let hash = empresa.value['_id'] + perfil.value['_id'];
      if (!hash) continue;
      if (index[hash]) {
        console.log("Removendo seleção...", empresa.value.nome, perfil.value.nome);
        empresa.setValue(null);
        perfil.setValue(null);
      }
      index[hash] = true;
    }
    return null;
  }

  checkPasswords(group: FormGroup) {

    let pass = group.controls.senha.value;
    let confirmPass = group.controls.senha2.value;
    if (!pass && !confirmPass) return null;
    return pass === confirmPass ? null : { notSame: true }
  }





  async getPlano(_id) {
    try {
      let data: any = await this.usuario.getOne(_id);
      if (data) {
        for (let prop in data) {
          try {
            this.formGroup.controls[prop].setValue(data[prop])
          } catch (error) {
            console.log(prop, error)
          }
        }
        for(let empresa of data.empresas || []){
          let emp = this.empresas.filter(e => e._id == empresa._id)[0]._id || null;
          let perf = this.perfis.filter(e => e._id == empresa.perfil._id)[0]._id || null;
          this.addEmpresa(emp, perf, empresa.sessoes.map(s => s._id));
        }
      }
    } catch (error) {
      this.usuario.errorRest(error);
    }
  }



  async salvar() {
    this.loading = true;
    try {
      let values = this.formGroup.value;
      let empresas = [];
      console.log(values)
      for (let empresa of values.empresas) {
        let _empresa = this.empresas.find(e => e._id == empresa.empresa)
        let _perfil = this.perfis.find(e => e._id == empresa.perfil)
        empresa.empresa = _empresa
        empresa.empresa.perfil = _perfil;
        empresas.push(empresa.empresa);
      }
      values.empresa = empresas[0];
      values.empresas = empresas;
      if (!values.senha) delete values.senha;
      console.log("values 2");
      console.log(values);
      if (this.id) values._id = this.id;
      await this.usuario.novo(values);
      this.usuario.notificacao.show('Salvo com sucesso!');
      window.history.back();
    } catch (error) {
      console.log(error)
      this.usuario.errorRest(error);
    }
    this.loading = false;
  }
  
}

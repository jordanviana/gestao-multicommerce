import { Component, OnInit, isDevMode } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    public template: TemplateService,
    private router: Router
  ) { }
  loading = false;
  form = new FormGroup({
    email: new FormControl("", Validators.required),
    senha: new FormControl("", Validators.required),
    token: new FormControl("")
  })

  ngOnInit(): void {

  }


  async logar(){
    this.loading = true;
    try {
      let { email, senha, token } = this.form.value
      let login = await this.usuarioService.loginV2(email, senha)
      this.usuarioService.salveSessao(login);
      this.router.navigate(['/admin']);
    } catch (error) {
      this.usuarioService.errorRest(error);
    }
    this.form.controls['senha'].reset();
    this.loading = false;
  }

}

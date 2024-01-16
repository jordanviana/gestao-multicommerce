import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { UsuarioService } from '../../services/usuario.service';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public menu: MenuService,
    public usuario: UsuarioService,
    public template: TemplateService
  ) { }

  public site = "adm.palpit.in"

  ngOnInit(): void {
    // let host = window.location.host
    this.site = "adm.palpit.in"
    this.usuario.carregaSessao();
  }



}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MenuService } from '../../services/menu.service';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public api: ApiService,
    public menu: MenuService,
    public template: TemplateService
  ) { }

  ngOnInit(): void {
    this.api.carregaSessao();
  }

  menusOpen = {};

  clickMenu(item){
    this.menusOpen[item.id] = !this.menusOpen[item.id];
    if(item.link)
      this.menu.show = false;
  }

  getMenus(pai = "0"){
    try {
      let _perms = this.api.sessao.usuario.empresa.permissoes;
      let permissoes = Object.keys(_perms).map( p => ({..._perms[p], id: p}));
      let menus = permissoes.filter(
        m => m.pai == pai && m.icon
      )
      return menus;
    } catch (error) {
      console.log(error)
    }
    return [];
  }


}

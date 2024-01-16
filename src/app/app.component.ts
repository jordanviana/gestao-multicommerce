import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { TemplateService } from './services/template.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private api: ApiService,
    private template: TemplateService,
    private title: Title,
  ){
    let config = this.template.getSite();
    this.title.setTitle(config.title);
    this.template.setColorTheme();
    this.api.carregaSessao();
    document.getElementById("favicon-img").setAttribute("href", config.favicon);

  }
}

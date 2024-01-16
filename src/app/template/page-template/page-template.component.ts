import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.css']
})
export class PageTemplateComponent implements OnInit {
  @Input('loading') loading;
  @Input('icon') icon;
  @Input('titulo') titulo;
  @Input('descricao') descricao;
  constructor() { }

  ngOnInit(): void {
  }

}

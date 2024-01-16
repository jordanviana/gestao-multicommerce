import { Component, OnInit, Input } from '@angular/core';
import { RelatorioService } from '../../services/relatorio.service';

@Component({
  selector: 'dynamic-report',
  templateUrl: './dynamic-report.component.html',
  styleUrls: ['./dynamic-report.component.css']
})
export class DynamicReportComponent implements OnInit {
  @Input("data") data;
  constructor(
    private relatorio: RelatorioService
  ) { }

  htmlchildrens = ``;
  html = '';

  ngOnInit(): void {
    console.log(this.relatorio.data);
    console.log(this.relatorio.teste);
    this.html = this.createDom(this.data).innerHTML;
  }

  createDom(item){
    let elemento = document.createElement(item.tag) as Element;
    console.log(typeof elemento);
    elemento.className = item.class;
    if(item.html)
      elemento.innerHTML = item.html;
    if(item.childrens)
      for(let children of item.childrens){
        elemento.appendChild(
          this.createDom(children)
        )
      }
    return elemento;
  }

}

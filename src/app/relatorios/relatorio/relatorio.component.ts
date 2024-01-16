import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RelatorioService } from '../../services/relatorio.service';
import * as jspdf from 'jspdf';

@Component({
  selector: 'relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  constructor(
    public relatorio: RelatorioService
  ) { }

  @ViewChild('body') body: ElementRef

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    let data = JSON.parse(localStorage.getItem("_relatorio_" + id));
    this.relatorio.data = data;
  }

  downloadPdf(){
    // let doc = new jspdf()
    // let obj = {
    //   '#editor': (element, renderer) => {
    //     return true
    //   }
    // }
    // let content = this.body.nativeElement
    // doc.fromHTML(content.innerHTML, 15, 15, {
    //   'width': 190,
    //   'elementHandlers': obj
    // })
    // doc.save('download.pdf')
  }


}

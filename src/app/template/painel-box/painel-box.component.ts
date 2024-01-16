import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'painel-box',
  templateUrl: './painel-box.component.html',
  styleUrls: ['./painel-box.component.css']
})
export class PainelBoxComponent implements OnInit {

  @Input('icon') icon;
  @Input('titulo') titulo;

  constructor() { }

  ngOnInit(): void {
  }

}

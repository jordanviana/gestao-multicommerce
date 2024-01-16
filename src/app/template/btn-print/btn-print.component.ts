import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'btn-print',
  templateUrl: './btn-print.component.html',
  styleUrls: ['./btn-print.component.css']
})
export class BtnPrintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  print(){
    window.print();
  }

}

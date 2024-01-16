import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'button-back',
  templateUrl: './button-back.component.html',
  styleUrls: ['./button-back.component.css']
})
export class ButtonBackComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  click(){
    window.history.back();
  }

}

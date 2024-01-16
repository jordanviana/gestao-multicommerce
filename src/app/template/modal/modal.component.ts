import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('idModal') idModal
  @Input('modal_title') modal_title

  constructor() { }

  ngOnInit(): void {
  }

  teste(){
    try {
      document.getElementById('reset').click()    
    } catch (error) {
      console.log(error)
    }
  }

  

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'text-spinner',
  templateUrl: './text-spinner.component.html',
  styleUrls: ['./text-spinner.component.css']
})
export class TextSpinnerComponent implements OnInit {
  @Input('loading') loading = false;
  constructor() { }

  ngOnInit(): void {
  }

}

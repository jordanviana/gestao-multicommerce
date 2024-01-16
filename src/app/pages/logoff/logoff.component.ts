import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.api.limpaSessao();
    this.router.navigate(['/login']);
  }

}

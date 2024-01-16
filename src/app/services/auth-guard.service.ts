import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(
    private _router: Router,
    private _usuario: ApiService
    ) {
      this._usuario.carregaSessao();
  }

  canActivate() {
    this._usuario.carregaSessao();
    if (this._usuario.sessao) {
        return true;
    }
    this._router.navigate(['/login']);
    return false;
  }

}

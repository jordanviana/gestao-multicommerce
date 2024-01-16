import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor() { }

  COLOR = {
    success: '#008000',
    warning: '#FF8C00',
    danger: '#DC143C',
  }

  show(texto = " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", duracao = 3000, color = this.COLOR.success ){
    let body = document.getElementsByTagName('body')[0];
    let alerta = document.createElement('div');
    let id = `alerta-app-${new Date().getTime().toString()}`;
    alerta.id = id;
    alerta.style.bottom = '0';
    alerta.style.left = '0';
    alerta.style.height = '100px';
    alerta.style.width = '100vw';
    alerta.style.background = 'red';
    alerta.style.position = 'fixed';
    alerta.style.zIndex = '99999999999';
    alerta.style.opacity = '0';
    alerta.style.background = color;
    alerta.style.color = 'white';
    alerta.style.display = 'flex';
    alerta.style.justifyContent = 'center';
    alerta.style.alignItems = 'center';
    alerta.style.textAlign = 'center';
    alerta.style.padding = '10px';
    alerta.style.overflow = 'hidden';
    

    alerta.innerHTML = `
    <h5>${texto}</h5> 
    `

    body.appendChild(alerta);
    alerta = document.getElementById(id) as any;
    this._show(alerta);
    setTimeout(()=>{
      this._show(alerta, 1, 0);
      setTimeout(()=>{
        alerta.remove();
      },300)
    },duracao);
  }

  _show(el, ini = 0, fim = 1, time = 300){
    let fps = 1000 / 30;
    let start = 0;
    let stop = time / fps;
    let inc = (fim - ini) / ( time / fps);
    let i = setInterval(()=>{
      ini += inc;
      el.style.opacity = ini.toFixed(2);
      start++;
      if(start >= stop){
        clearInterval(i);
      }
    }, fps);
  }

  erroRest(error){
    if (error && error.error && error.error.msg) {
      let msg = error.error.msg;
      this.show(msg, 3000, this.COLOR.danger);
    } else if (error && error.msg) {
      this.show(error.msg, 3000, this.COLOR.danger);
    } else {
      this.show('Ocorreu um erro.', 3000, this.COLOR.danger);
    }
  }

}

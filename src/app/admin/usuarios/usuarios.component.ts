import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private api: UsuarioService, public route: ActivatedRoute) { }
  title = "Usuários"
  descricao = "Listando usuários"
  pagina = 0
  porpagina = 0
  busca = ""
  total = 0
  loading = false
  lista = []

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      this.porpagina = Number(params.params['porpagina']) || 0;
      this.pagina = Number(params.params['pagina']) || 0;
      this.busca = params.params['busca'] || "";
      this.buscar(this.busca)
    });
  }

  async buscar(busca) {
    this.loading = true;
    try {
      let data: any = await this.api.lista(this.pagina, this.porpagina, busca, false)
      console.log(this.pagina, this.porpagina, busca)
      this.lista = data.lista
      this.total = data.total
    } catch (error) {
      this.api.errorRest(error);
    }
    this.loading = false;
  }

}

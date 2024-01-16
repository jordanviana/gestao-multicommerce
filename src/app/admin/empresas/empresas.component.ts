import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {

  loading: boolean = false
  total = 0
  lista = []
  porpagina = 0
  pagina = 0
  busca = ''

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      this.porpagina = Number(params.params['porpagina'] || 0)
      this.pagina = Number(params.params['pagina'] || 0)
      this.busca = params.params['busca'] || ""
      this.empresas()
    })
  }

  async empresas() {
    this.loading = true
    try {
      let data: any = await this.empresaService.getEmpresas(this.busca, this.porpagina, this.pagina)
      this.lista = data.lista
      this.total = data.total
    } catch (error) {
      console.log(error)
      this.empresaService.notificacao.erroRest(error)
    }
    this.loading = false
  }

}

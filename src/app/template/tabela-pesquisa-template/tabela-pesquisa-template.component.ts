import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "tabela-pesquisa-template",
  templateUrl: "./tabela-pesquisa-template.component.html",
  styleUrls: ["./tabela-pesquisa-template.component.css"],
})
export class TabelaPesquisaTemplateComponent implements OnInit {
  @Input("hidesearch") hidesearch;
  @Input("loading") loading;
  @Input("total") total;
  @Input("linknovo") linknovo;
  @Input("data") data: boolean = false;
  porpagina = 0;
  pagina = 0;
  private busca: Subject<string> = new Subject();
  buttoes = [];
  iData;

  constructor(private route: ActivatedRoute, private router: Router) {
    if (this.hidesearch) {
      this.hidesearch = false;
    }
  }

  ngOnInit(): void {
    this.iData = new Date().toISOString().substring(0, 10);
    this.route.queryParamMap.subscribe((params: any) => {
      this.porpagina = (Number(params.params["porpagina"]) || 20);
      this.pagina = (Number(params.params["pagina"]) || 0);
      this.busca.next(params.params["busca"] || "");
    });
    this.busca.pipe(debounceTime(500)).subscribe((v) => {
      this.router.navigate([window.location.pathname], {
        queryParams: {
          pagina: this.pagina,
          porpagina: this.porpagina,
          busca: v,
          // data: this.iData,
        },
      });
    });
  }

  clickPage(pagina) {
    if (pagina < 0) pagina = 0;
    this.router.navigate([window.location.pathname], {
      queryParams: {
        pagina: pagina,
        porpagina: this.porpagina,
      },
    });
  }

  buscar(busca) {
    this.busca.next(busca);
  }

  getPagina(p) {
    this.pagina += p;
    if (this.pagina <= 0) this.pagina = 1;
    return this.pagina;
  }

  getButtons() {
    this.buttoes = [];
    let countPaginas = Math.ceil(this.total / this.porpagina);
    let butttons = [];
    if (countPaginas > 4) {
      butttons.push(this.pagina - 2);
      butttons.push(this.pagina - 1);
      butttons.push(this.pagina);
      butttons.push(this.pagina + 1);
      butttons.push(this.pagina + 2);
      butttons.push(countPaginas);
    } else {
      for (let x = 0; x < countPaginas; x++) {
        butttons.push(x + 1);
      }
    }
    this.buttoes = butttons.filter((x) => x > 0);
    return this.buttoes;
  }
}

import { ProdutoFormComponent } from './operacional/produto-form/produto-form.component';
import { TipoprodutoFormComponent } from './operacional/tipoproduto-form/tipoproduto-form.component';
import { TipoprodutoComponent } from './operacional/tipoproduto/tipoproduto.component';
import { SubcategoriaFormComponent } from './operacional/subcategoria-form/subcategoria-form.component';
import { SubcategoriaComponent } from './operacional/subcategoria/subcategoria.component';
import { CategoriaFormComponent } from './operacional/categoria-form/categoria-form.component';
import { CategoriaComponent } from './operacional/categoria/categoria.component';
import { HomeComponent } from './admin/home/home.component';

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./admin/admin/admin.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuardService } from "./services/auth-guard.service";
import { LogoffComponent } from "./pages/logoff/logoff.component";
import { ImpressaoComponent } from "./template/impressao/impressao.component";
import { EmpresasComponent } from "./admin/empresas/empresas.component";
import { EmpresasFormComponent } from "./admin/empresas-form/empresas-form.component";
import { RelatorioComponent } from "./relatorios/relatorio/relatorio.component";
import { AppsComponent } from "./pages/apps/apps.component";
import { UsuariosComponent } from "./admin/usuarios/usuarios.component";
import { UsuariosFormComponent } from "./admin/usuarios-form/usuarios-form.component";
import { ProdutoComponent } from './operacional/produto/produto.component';
import { MarcaComponent } from './operacional/marca/marca.component';
import { MarcaFormComponent } from './operacional/marca-form/marca-form.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/admin",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "logoff",
    component: LogoffComponent,
  },
  {
    path: "apps",
    component: AppsComponent,
  },
  {
    path: "relatorios",
    component: RelatorioComponent,
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "empresa",
        component: EmpresasComponent,
      },
      {
        path: "empresa/form",
        component: EmpresasFormComponent,
      },
      {
        path: "usuario",
        component: UsuariosComponent,
      },
      {
        path: "usuario/form",
        component: UsuariosFormComponent,
      }
    ]
  },
  {
    path: "operacional",
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: "categoria",
        component: CategoriaComponent,
      },
      {
        path: "categoria/form",
        component: CategoriaFormComponent,
      },
      {
        path: "subcategoria",
        component: SubcategoriaComponent,
      },
      {
        path: "subcategoria/form",
        component: SubcategoriaFormComponent,
      },
      {
        path: "tipoproduto",
        component: TipoprodutoComponent,
      },
      {
        path: "tipoproduto/form",
        component: TipoprodutoFormComponent,
      },
      {
        path: "produto",
        component: ProdutoComponent,
      },
      {
        path: "produto/form",
        component: ProdutoFormComponent
      },
      {
        path: "marca",
        component: MarcaComponent,
      },
      {
        path: "marca/form",
        component: MarcaFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

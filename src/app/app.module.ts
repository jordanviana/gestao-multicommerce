import { HoraBr } from './pipes/horaBr.pipe';
import { DataHoraBr } from "./pipes/dataHoraBr.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { AgmCoreModule } from "@agm/core";
import { registerLocaleData } from "@angular/common";
import localeBr from "@angular/common/locales/pt";
registerLocaleData(localeBr, "pt");
import { NgxCurrencyModule } from "ngx-currency";
import { FormsModule } from "@angular/forms";
import { AgmDirectionModule } from "agm-direction";
import { NgQrScannerModule } from "angular2-qrscanner";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminComponent } from "./admin/admin/admin.component";
import { TemplateComponent } from "./template/template/template.component";
import { MenuComponent } from "./template/menu/menu.component";
import { HeaderComponent } from "./template/header/header.component";
import { RodapeComponent } from "./template/rodape/rodape.component";
import { ConteudoComponent } from "./template/conteudo/conteudo.component";
import { TextSpinnerComponent } from "./template/text-spinner/text-spinner.component";
import { HomeComponent } from "./admin/home/home.component";
import { LogoffComponent } from "./pages/logoff/logoff.component";
import { PageTemplateComponent } from "./template/page-template/page-template.component";
import { TabelaPesquisaTemplateComponent } from "./template/tabela-pesquisa-template/tabela-pesquisa-template.component";
import { InputGroupComponent } from "./template/input-group/input-group.component";
import { ButtonBackComponent } from "./template/button-back/button-back.component";
import { SpinnerComponent } from "./template/spinner/spinner.component";
import { PainelBoxComponent } from "./template/painel-box/painel-box.component";
import { DateBrSimplesPipe } from "./pipes/date-br-simple.pipe";
import { BtnPrintComponent } from "./template/btn-print/btn-print.component";
import { BackDropComponent } from "./template/back-drop/back-drop.component";
import { LeitorQrComponent } from "./template/leitor-qr/leitor-qr.component";
import { ModalComponent } from "./template/modal/modal.component";
import { ImpressaoComponent } from "./template/impressao/impressao.component";
import { EmpresasComponent } from "./admin/empresas/empresas.component";
import { EmpresasFormComponent } from "./admin/empresas-form/empresas-form.component";
import { RelatorioComponent } from "./relatorios/relatorio/relatorio.component";
import { DynamicReportComponent } from "./template/dynamic-report/dynamic-report.component";
import { NgxAlertDialogLdpModule } from "ngx-alert-dialog-ldp";
import { AppsComponent } from "./pages/apps/apps.component";

import { UsuariosComponent } from "./admin/usuarios/usuarios.component";
import { UsuariosFormComponent } from "./admin/usuarios-form/usuarios-form.component";
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { CategoriaComponent } from './operacional/categoria/categoria.component';
import { CategoriaFormComponent } from './operacional/categoria-form/categoria-form.component';
import { SubcategoriaFormComponent } from './operacional/subcategoria-form/subcategoria-form.component';
import { SubcategoriaComponent } from './operacional/subcategoria/subcategoria.component';
import { TipoprodutoComponent } from './operacional/tipoproduto/tipoproduto.component';
import { TipoprodutoFormComponent } from './operacional/tipoproduto-form/tipoproduto-form.component';
import { ProdutoComponent } from './operacional/produto/produto.component';
import { ProdutoFormComponent } from './operacional/produto-form/produto-form.component';
import { MarcaComponent } from './operacional/marca/marca.component';
import { MarcaFormComponent } from './operacional/marca-form/marca-form.component';



export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    TemplateComponent,
    MenuComponent,
    HeaderComponent,
    RodapeComponent,
    ConteudoComponent,
    TextSpinnerComponent,
    HomeComponent,
    LogoffComponent,
    PageTemplateComponent,
    TabelaPesquisaTemplateComponent,
    InputGroupComponent,
    ButtonBackComponent,
    SpinnerComponent,
    PainelBoxComponent,
    DateBrSimplesPipe,
    DataHoraBr,
    HoraBr,
    DateBrSimplesPipe,
    BtnPrintComponent,
    BackDropComponent,
    LeitorQrComponent,
    ModalComponent,
    ImpressaoComponent,
    EmpresasComponent,
    EmpresasFormComponent,
    RelatorioComponent,
    DynamicReportComponent,
    AppsComponent,
    UsuariosComponent,
    UsuariosFormComponent,
    CategoriaComponent,
    CategoriaFormComponent,
    SubcategoriaFormComponent,
    SubcategoriaComponent,
    TipoprodutoComponent,
    TipoprodutoFormComponent,
    ProdutoComponent,
    ProdutoFormComponent,
    MarcaComponent,
    MarcaFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxCurrencyModule.forRoot({
      align: "right",
      allowNegative: false,
      allowZero: true,
      decimal: ",",
      precision: 2,
      prefix: "",
      suffix: "",
      thousands: ".",
      nullable: true,
      min: null,
      max: null,
    }),
    NgxMaskModule.forRoot({}),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyA1NuKiHoUUML_RdomgyrA-gfJRyKEUUyU",
    }),
    LottieModule.forRoot({ player: playerFactory }),
    AgmDirectionModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgQrScannerModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxAlertDialogLdpModule,
    // RelatorioComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pt" }],
  bootstrap: [AppComponent],
})
export class AppModule {}

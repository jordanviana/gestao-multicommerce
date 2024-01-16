import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  constructor() {}

  getSite() {
    let host = window.location.hostname;
    if (host.indexOf("default") != -1) {
      return this.sites.default;
    }
    return this.sites.default;
  }

  setColorTheme() {
    let config = this.getSite();
    let { r, g, b } = config.corpadrao;
    document
      .querySelector("body")
      .style.setProperty("--cor-principal", `rgb(${r},${g},${b})`);
    document.querySelector("body").style.setProperty("--cor-r", String(r));
    document.querySelector("body").style.setProperty("--cor-g", String(g));
    document.querySelector("body").style.setProperty("--cor-b", String(b));
  }

  public sites = {
    default: {
      classicon: "logo",
      logo: "../../../assets/logo.png",
      favicon: "../../favicon.ico",
      title: "Sistema",
      rodape: "Sistema",
      org: "Sistema",
      corpadrao: {
        r: 108,
        g: 105,
        b: 141,
      },
      getLabel: (label) => {
        let labels = {
          "Nome": "Nome"
        };
        if (labels[label]) return labels[label]
        else return label
      }
    }
  };
}

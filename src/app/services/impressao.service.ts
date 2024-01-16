import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';
import {monospace} from '../../assets/fonts/monospace'



@Injectable({
  providedIn: 'root'
})
export class ImpressaoService {

  doc = null;
  altura = 0;
  margemLeft = 200
  public data = []

  constructor() { }


  init() {
    this.doc = new jspdf();
    this.altura = 20;
    this.doc.page = 1
  }

  drawLinha(largura = 200, margemInit = 10, top = false) {
    let altura = top ? this.altura - 10 : this.altura + 2;
    this.doc.line(margemInit, altura, largura, altura);
  }

  footer() {
    this.doc.text(96, 285, 'Página ' + this.doc.page);
    this.doc.page++;
  }

  addText(texto, alinha = null, size = 10) {
    this.doc.setFontSize(size);
    this.doc.setFontStyle('normal');
    if (alinha == 'center') {
      this.margemLeft = 105;
    }
    if (alinha == 'right') {
      this.margemLeft = 200;
    }
    if (alinha == 'left') {
      this.margemLeft = 10;
    }
    this.doc.text(texto, this.margemLeft, this.altura, null, null, alinha);
    this.altura += size * 0.4;
  }

  addTextNegrito(texto, alinha = null, size = 10) {
    this.doc.setFontSize(size);
    this.doc.setFontStyle('bold');
    if (alinha == 'center') {
      this.margemLeft = 105;
    }
    if (alinha == 'right') {
      this.margemLeft = 200;
    }
    if (alinha == 'left') {
      this.margemLeft = 10;
    }
    this.doc.text(texto, this.margemLeft, this.altura, null, null, alinha);
    this.altura += size * 0.4;
  }

  addLinha(size = 10) {
    this.altura += size * 0.5;
  }

  addColuna(texto, margemInit = 0, alinha = null, size = 10, bold = false) {
    this.doc.setFontSize(size);
    if (!bold) {
      this.doc.setFontStyle('normal');
    } else {
      this.doc.setFontStyle('bold');
    }
    this.doc.text(texto, margemInit, this.altura, null, null, alinha);
  }

  marcaDezena(x, y, largura, altura) {
    this.doc.setFillColor(0, 0, 0);
    this.doc.ellipse(x, y, largura, altura, 'F');
  }

  drawStriped(largura = 200, margemInit = 10) {
    this.doc.setDrawColor(192, 192, 192)
    let altura = this.altura + 1.5;
    this.doc.line(margemInit, altura, largura, altura);
    this.doc.setDrawColor(0, 0, 0)
  }

  geraCaracter(char, tamanho) {
    let txt = ""
    for (let i = 0; i < tamanho; i++) {
        txt += char
    }
    return txt
}



  printTabela(tabela) {
    let margemInit = 10;
    this.addLinha(10);
    for (let titulo of tabela.data.titulos) {
      let _sizespace = ((190 / 100) * titulo.largura);
      let sizespace = margemInit;
      if (titulo.alinha == 'right') {
        sizespace += _sizespace;
      }
      if (titulo.alinha == 'center') {
        sizespace += (_sizespace / 2);
      }
      this.addColuna(titulo.texto, sizespace, titulo.alinha, 10, true);
      margemInit += _sizespace;
    }
    this.drawLinha();

    this.addLinha(4);
    let registros = 0
    for (let tr of tabela.data.linhas) {
      let index = tabela.data.linhas.indexOf(tr)
      registros = tabela.data.linhas.length
      margemInit = 10;
      this.addLinha();
      for (let col of tr) {
        if (col.texto == 'page') {
          this.altura = 20
          this.footer()
          this.doc.addPage()
          continue
        }
        let _sizespace = ((190 / 100) * col.largura);
        let sizespace = margemInit;
        let negrito = false
        if (col.negrito) negrito = true
        if (col.alinha == 'right') {
          sizespace += _sizespace;
        }
        if (col.alinha == 'center') {
          sizespace += (_sizespace / 2);
        }
        if (col.background) {
          this.marcaDezena(sizespace, this.altura - 1.5, 3, 3);
          this.doc.setTextColor(255, 255, 255);
        } else {
          this.doc.setTextColor(0, 0, 0);
        }

        this.addColuna(col.texto, sizespace, col.alinha, 10, negrito);
        margemInit += _sizespace;
      }
      if (index != registros - 1) this.drawStriped()
    }
    this.drawLinha();
    this.addLinha(5);
    for (let tr of tabela.data.rodape) {
      margemInit = 10;
      this.addLinha();
      for (let col of tr) {
        if (col.texto == 'page') {
          this.altura = 20
          this.footer()
          this.doc.addPage()
          continue
        }
        let _sizespace = ((190 / 100) * col.largura);
        let sizespace = margemInit;
        if (col.alinha == 'right') {
          sizespace += _sizespace;
        }
        if (col.alinha == 'center') {
          sizespace += (_sizespace / 2);
        }
        this.addColuna(col.texto, sizespace, col.alinha, 10, true);
        margemInit += _sizespace;
      }
    }
  }


  print(data = null, filename = "") {

    if (data) {
      this.data = data;
    }
    this.init();
    for (let linha of this.data) {
      linha.texto = linha.texto
      switch (linha.tipo) {
        case 'linha':
          this.drawLinha()
          break;
        case 'page':
          this.altura = 20
          this.footer()
          this.doc.addPage()
          break;
        case 'titulo':
          this.addText(linha.texto, linha.alinha, 15);
          break;
        case 'texto':
          this.addText(linha.texto, linha.alinha, 10);
          break;
        case 'texto-negrito':
          this.addTextNegrito(linha.texto, linha.alinha, 10);
          break;
        case 'tabela':
          this.printTabela(linha)
          break;
      }
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.doc.save('filename.pdf');
    } else {
      if (filename.length > 1) this.doc.save(`${filename}.pdf`);
      else this.doc.output('dataurlnewwindow')
    }
    // this.doc.output('dataurlnewwindow')
  }

  printGuia(guia, folha, posicao) {
    this.altura = 20
    this.margemLeft = 10
    if (posicao % 2 == 0) {
        this.margemLeft = 110
    }
    if (posicao > 2) {
        this.altura = 160
    }

    switch (posicao) {
        case 1:
            this.doc.line(9, 15, 104, 15) //cima
            this.doc.line(9, 150, 104, 150) //baixo
            this.doc.line(9, 15, 9, 150) //esquerda
            this.doc.line(104, 15, 104, 150) //direita
            break;

        case 2:
            this.doc.line(109, 15, 204, 15) //cima
            this.doc.line(109, 150, 204, 150) //baixo
            this.doc.line(109, 15, 109, 150) //esquerda
            this.doc.line(204, 15, 204, 150) //direita
            break;

        case 3:
            this.doc.line(9, 155, 104, 155) //cima
            this.doc.line(9, 290, 104, 290) //baixo
            this.doc.line(9, 155, 9, 290) //esquerda
            this.doc.line(104, 155, 104, 290) //direita
            break;

        case 4:
            this.doc.line(109, 155, 204, 155) //cima
            this.doc.line(109, 290, 204, 290) //baixo
            this.doc.line(109, 155, 109, 290) //esquerda
            this.doc.line(204, 155, 204, 290) //direita
            break;
    }

    let txt1 = "GUIA DE MOVIMENTO"
    let txt2 = "SESSÃO"
    let txt3 = "PONTO"
    let txt4 = "HORÁRIO DE IMPRESSÃO"
    this.addText(`${txt1}${this.geraCaracter(" ", 31 - txt1.length)}${guia.data}`, null, 11)
    this.addText(`${txt2}: ${guia.sessao}`, null, 11)
    this.addText(`${txt3}: ${guia.ponto}`, null, 11)
    this.addText(`${txt4}:${this.geraCaracter(" ", 27 - txt4.length)}${guia.impresso}`, null, 9)

    folha.forEach(linha => {
        let qtd_textos = linha.texto.length
        let txt = "";
        linha.texto.forEach((texto, i) => {
            // console.log(texto)
            switch (qtd_textos) {
                case 1:
                    txt = texto
                    break
                case 2:
                    if (i == 0) {
                        txt += (texto + this.geraCaracter(" ", 25 - texto.length))
                    }
                    if (i == 1) {
                        txt += (this.geraCaracter(" ", 20 - texto.length) + texto)
                    }
                    break
                case 3:
                    if (i == 0) {
                        txt += (texto + this.geraCaracter(" ", 15 - texto.length))
                    }
                    if (i > 0) {
                        txt += (this.geraCaracter(" ", 15 - texto.length) + texto)
                    }
                    break
            }
        });
        this.addText(txt, null, 10)
    })
    let dif = 26 - folha.length
    for (let j = 0; j < dif; j++) {
        this.addText("", null, 10)
    }
    this.addLinha()
}

  printGuias(dados) {
    this.init();
    this.doc.addFileToVFS("Monospace.ttf", monospace)
    this.doc.addFont('Monospace.ttf', 'Monospace', 'normal')
    this.doc.setFont('Monospace')

    let posicao = 0
    dados.pontos.forEach((ponto, i) => {
        if(Number(i)){
            if(ponto.sessao != dados.pontos[Number(i)-1].sessao){
                this.doc.addPage();
                this.altura = 20
                this.margemLeft = 10
                posicao = 0
            }
        }
        ponto.folhas.forEach(folha => {
            posicao++
            this.printGuia(ponto, folha, posicao)
            if (posicao == 4) {
                this.doc.addPage();
                this.altura = 20
                this.margemLeft = 10
                posicao = 0
            }
        })
    })

    // dados.paginas.forEach(pagina => {
    //     let count_guia = 0
    //     pagina.forEach(guia => {
    //         guia.folhas.forEach(folha => {
    //             count_guia++

    //         });
    //     });

    //     this.doc.addPage()

    //     this.altura = 20
    //     this.margemLeft = 10
    // });
    // let string = this.doc.output('datauristring');
    // let iframe = `
    // <style> html, body, iframe {margin: 0; padding: 0; border: none}, </style>
    // <iframe  style='margin: 0; padding: 0; ' width='100%' height='100%' src='${string}'></iframe>
    // `;
    // let x = window.open();
    // x.document.open();
    // x.document.write(iframe);
    // x.document.close();

    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //     this.doc.save('filename.pdf');
    // }
    // else {
    //     this.doc.output('dataurlnewwindow')
    // }

    this.doc.save('guias_movimento.pdf');

}

}

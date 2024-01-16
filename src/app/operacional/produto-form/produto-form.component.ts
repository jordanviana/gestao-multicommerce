import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MarcaService } from 'src/app/services/marca.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { TipoprodutoService } from 'src/app/services/tipoproduto.service';
import { UtilService } from 'src/app/services/util.service';
declare var firebase;

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  constructor(
    private categoriaService: CategoriaService,
    private subcategoriaService: SubcategoriaService,
    private tipoprodutoService: TipoprodutoService,
    private produtoService: ProdutoService,
    private marcaService: MarcaService,
    private router: Router,
    private actroute: ActivatedRoute,
    private util: UtilService) { }

  loading = false
  loading_modal = false
  id = ""
  categorias = []
  subcategorias = []
  filteredSubcategorias = []
  tipoprodutos = []
  filteredTipoprodutos = []
  marcas = []
  filteredMarcas = []
  imagens = []
  modal = {
    title: '',
    tipo: ''
  }

  public form = new FormGroup({
    nome: new FormControl("", Validators.required),
    descricao: new FormControl(""),
    nome_destaque: new FormControl(""),
    ref: new FormControl(""),
    destaque: new FormControl(false),
    categoria: new FormControl("", Validators.required),
    subcategoria: new FormControl("", Validators.required),
    tipoproduto: new FormControl("", Validators.required),
    marca: new FormControl("", Validators.required),
    cores: new FormArray([]),
    imagens: new FormArray([])
  })
  public formModal = new FormGroup({
    nome: new FormControl("", Validators.required),
    nome_exibe: new FormControl(""),
    destaque: new FormControl(false)
  })
  async ngOnInit() {
    this.loading = true
    let gets = [
      this.getCategorias(),
      this.getSubCategorias(),
      this.getTipoProdutos(),
      this.getMarcas()
    ]
    await Promise.all(gets)
    this.filteredTipoprodutos = this.tipoprodutos
    this.loading = false
    this.actroute.queryParamMap.subscribe((params: any) => {
      this.id = params.params['_id'] || ""
      if (this.id) this.getProduto(this.id)
    })
  }

  async filter(change, value) {
    switch (change) {
      case 'cat':
        this.filteredSubcategorias = this.subcategorias.filter(s => s.categoria._id == value)
        this.filteredMarcas = this.marcas.filter(m => m.categoria._id == value)
        this.filteredTipoprodutos = []
        break;
      case 'subcat':
        this.filteredTipoprodutos = this.tipoprodutos.filter(t => t.subcategoria._id == value)
        break;
    }
  }

  setModal(tipo) {
    this.modal.tipo = tipo
    switch (tipo) {
      case 'categoria':
        this.modal.title = 'Nova categoria'
        break;
      case 'subcategoria':
        this.modal.title = 'Nova sub categoria'
        break;
      case 'tipoproduto':
        this.modal.title = 'Novo tipo de produto'
        break;
      case 'marca':
        this.modal.title = 'Nova marca'
        break;
    }
  }

  async salvarModal() {
    this.loading_modal = true
    let values = this.formModal.value
    if (!values.nome_exibe) values.nome_exibe = values.nome
    try {
      switch (this.modal.tipo) {
        case 'categoria':
          let dadosCat: any = await this.categoriaService.novo(values)
          this.categoriaService.notificacao.show('Categoria salva com sucesso!');
          this.categorias.push(dadosCat)
          this.filteredMarcas = []
          this.filteredSubcategorias = []
          this.filteredTipoprodutos = []
          this.filteredMarcas = []
          this.form.controls['categoria'].patchValue(dadosCat._id)
          break;
        case 'subcategoria':
          values.categoria = this.categorias.find(c => c._id == this.form.controls['categoria'].value)
          let dadosSub: any = await this.subcategoriaService.novo(values)
          this.categoriaService.notificacao.show('Sub categoria salva com sucesso!');
          this.subcategorias.push(dadosSub)
          this.filteredSubcategorias.push(dadosSub)
          this.form.controls['subcategoria'].patchValue(dadosSub._id)
          break;
        case 'tipoproduto':
          values.categoria = this.categorias.find(c => c._id == this.form.controls['categoria'].value)
          values.subcategoria = this.subcategorias.find(c => c._id == this.form.controls['subcategoria'].value)
          let dadosTipoProd: any = await this.tipoprodutoService.novo(values)
          this.categoriaService.notificacao.show('Tipo de produto salvo com sucesso!');
          this.tipoprodutos.push(dadosTipoProd)
          this.filteredTipoprodutos.push(dadosTipoProd)
          this.form.controls['tipoproduto'].patchValue(dadosTipoProd._id)
          break;
        case 'marca':
          values.categoria = this.categorias.find(c => c._id == this.form.controls['categoria'].value)
          let dadosMarca: any = await this.marcaService.novo(values)
          this.categoriaService.notificacao.show('Marca salva com sucesso!');
          this.marcas.push(dadosMarca)
          this.filteredMarcas.push(dadosMarca)
          this.form.controls['marca'].patchValue(dadosMarca._id)
          break;
      }
      this.fecharModal()
      this.formModal.reset()
    } catch (error) {
      console.log(error)
    }
    this.loading_modal = false
  }
  fecharModal(reset = false) {
    try {
      document.getElementById('fecha').click()
      if (reset) this.formModal.reset()
    } catch (error) {
      console.log(error)
    }
  }
  async getCategorias() {
    try {
      let { lista }: any = await this.categoriaService.lista(0, 5000, "")
      this.categorias = lista
    } catch (error) {
      console.log(error)
    }
  }
  async getSubCategorias() {
    try {
      let { lista }: any = await this.subcategoriaService.lista(0, 5000, "")
      this.subcategorias = lista
    } catch (error) {
      console.log(error)
    }
  }
  async getTipoProdutos() {
    try {
      let { lista }: any = await this.tipoprodutoService.lista(0, 5000, "")
      this.tipoprodutos = lista
    } catch (error) {
      console.log(error)
    }
  }
  async getMarcas() {
    try {
      let { lista }: any = await this.marcaService.lista(0, 5000, "")
      this.marcas = lista
    } catch (error) {
      console.log(error)
    }
  }

  async getProduto(id) {
    this.loading = true
    try {
      let dados = await this.categoriaService.getOne(id)
      if (dados) {
        this.util.setValueControls(this.form, dados)
      }
    } catch (error) {
      console.log(error)
    }
    this.loading = false
  }

  async salvar() {
    this.loading = true
    try {
      let values = this.form.value
      if (this.id) values._id = this.id
      let novo: any = await this.produtoService.novo(values)
      if (novo._id) {
        this.id = novo._id
        let imagensSalvar = this.imagens.filter(i => !i.url)
        for (let i in imagensSalvar){
          await this.uploadImagem(this.imagens[i].file, i)
        }
      }
      this.categoriaService.notificacao.show('Produto salva com sucesso!');
      this.router.navigate(["/operacional/produto"])
      console.log(values)
    } catch (error) {
      this.produtoService.errorRest(error)
      console.log(error)
    }
    this.loading = false
  }

  async populaFormasPagamento(formas_pagamento = []) {
    try {
      for (let form of formas_pagamento) {
        (this.form.get('cores') as FormArray)
          .push(new FormGroup({
            id: new FormControl(form.id),
            nome: new FormControl(form.nome),
            percent_ajuste: new FormControl(form.percent_ajuste)
          }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  fileToBS64(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onerror = () => {
        reject("Não foi possível converter para BS64");
      };
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async uploadImagem(dataURL, i) {
    this.imagens[i].loading = true;
    let { _id } = this.form.getRawValue();
    let that = this;
    let uid = new Date().getTime().toString();
    let str = `${uid}.png`;
    let file = this.dataURLtoFile(dataURL, str);
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef
      .child(`imagens_produtos/${this.id}/` + str)
      .put(file, { contentType: "image/png" });
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        that.imagens[i].percent = progress;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      function (error) {
        that.imagens[i].loading = false;
        that.produtoService.notificacao.show(
          "Erro ao enviar imagem!",
          3000,
          that.produtoService.notificacao.COLOR.danger
        );
      },
      function () {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(async function (downloadURL) {
            console.log("File available at", downloadURL, uid);
            that.imagens[i].progress = 100;
            await that.salvarImagem(this.id, downloadURL, uid, i);
            that.imagens[i].loading = false;
          });
      }
    );
  }

  async fileChangeEvent(event) {
    for (let i of event) {
      let _ = await this.fileToBS64(i);
      this.imagens.push({
        file: _,
        url: "",
        ref: "",
        loading: false,
        id_produto: this.id
      });
    }
  }

  async salvarImagem(produtoId, url, ref, i) {
    try {
      this.imagens[i].url = url;
      this.imagens[i].ref = ref;
      await this.produtoService.setImage({ produtoId, url, ref, delete: false });
      this.imagens[i].loading = false;
      return;
    } catch (error) {
      this.produtoService.errorRest("Falha ao adicionar imagem");
    }
  }

  async deleteImagem(i) {
    this.imagens[i].loading = true;
    let { _id } = this.form.getRawValue();
    let { url, ref } = this.imagens[i];
    try {
      if (url && ref) {
        await this.produtoService.setImage({ _id, url, ref, delete: true });
      }
      this.imagens.splice(i, 1);
      this.produtoService.notificacao.show("Imagem removida com sucesso!");
    } catch (error) {
      this.produtoService.errorRest("Falha ao adicionar imagem");
    }
  }

  zoomImage(url) {

  }

}

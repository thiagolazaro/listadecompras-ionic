import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/produto';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/core/service/toast.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ProdutosService } from '../shared/produtos.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.page.html',
  styleUrls: ['./form-produto.page.scss'],
})
export class FormProdutoPage implements OnInit {
  titulo: string = 'Novo Produto';
  public produto!: Produto;
  public formProduto!: FormGroup;
  lista: number = -1;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private produtoService: ProdutosService,
    private formBuilder: FormBuilder,
    private toast: ToastService,
  ) {
    this.formProduto = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      quantidade: ['', Validators.compose([
        Validators.required
      ])],
    });
  }

  ngOnInit() {
    this.produto = new Produto();

    const listaParam = this.route.snapshot.paramMap.get('lista');
    // Utilizado para vincular o produto a está lista
    if (listaParam) {
      this.lista = parseInt(listaParam);
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    // Pega id da lista
    if (idParam) {
      this.titulo = 'Editar Produto';
    }
  }

  async carregaProduto(id: number) {
    this.produto = await this.produtoService.getById(id);
  }

  async onSubmit() {
    try {
      // Executa primeiro dados complementares
      await this.preencheDadosComplementar();

      const resultado = await this.produtoService.save(this.produto);
      this.produto.id = resultado.insertId;
      this.toast.success('Produto salvo com sucesso');
      this.nav.pop();
    } catch (error) {
      console.log(error);
      this.toast.error('Ocorreu um erro ao tentar salvar a Categoria.');
    }
  }

  async preencheDadosComplementar() {
    // Se o produto não tem id, significada que não foi inserido no banco
    if (!this.produto.id) {
      // Vou popular a lista do produto
      this.produto.lista = this.lista;
      // Vou pegar a sequencia
      this.produto.sequencia = await this.produtoService.addQuantidadeProduto(this.lista, this.produto.categoria);
    }
  }
}

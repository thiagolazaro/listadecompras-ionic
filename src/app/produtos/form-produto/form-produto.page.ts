import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/produto';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/core/service/toast.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ProdutosService } from '../shared/produtos.service';
import { Categoria } from 'src/app/categorias/shared/categoria';
import { CategoriaService } from 'src/app/categorias/shared/categoria.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.page.html',
  styleUrls: ['./form-produto.page.scss'],
})
export class FormProdutoPage implements OnInit {
  titulo: string = 'Novo Produto';
  public produto!: Produto;
  public categorias: Categoria[] = [];
  public formProduto!: FormGroup;
  lista: number = -1;


  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private produtoService: ProdutosService,
    private categoriaService: CategoriaService,
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

    // Utilizado para vincular o produto a está lista
    const idListaParam = this.route.snapshot.paramMap.get('lista');
    // Pega id da lista
    const idProdutoParam = this.route.snapshot.paramMap.get('id');


    if (idListaParam) {
      this.lista = parseInt(idListaParam);
    }

    // Carregando as categorias para popular o campo de seleção
    this.carregaCategorias();

    if (idProdutoParam) {
      this.titulo = 'Editar Produto';
      this.carregaProduto(parseInt(idProdutoParam));
    }
  }

  async carregaProduto(id: number) {
    this.produto = await this.produtoService.getById(id);
  }

  async carregaCategorias() {
    this.categorias = await this.categoriaService.getAll();
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

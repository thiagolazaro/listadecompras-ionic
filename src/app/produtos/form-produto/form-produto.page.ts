import { Component, OnInit } from '@angular/core';
import { Produto } from '../shared/produto';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/core/service/toast.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.page.html',
  styleUrls: ['./form-produto.page.scss'],
})
export class FormProdutoPage implements OnInit {
  titulo: string = 'Novo Produto';
  public produto!: Produto;
  public formProduto!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
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

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.titulo = 'Editar Produto';
    }
  }

  async carregaProduto(id: number) {
    this.produto = new Produto();
  }

  async onSubmit() {
    try {
      // const resultado  = await this.categoriaService.save(this.categoria);
      // this.categoria.id = resultado.insertId;
      // this.toast.success('Categoria salva com sucesso');
      this.nav.pop();
    } catch (error) {
      console.log(error);
      this.toast.error('Ocorreu um erro ao tentar salvar a Categoria.');
    }
  }

}

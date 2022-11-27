import { ToastService } from 'src/app/core/service/toast.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../shared/categoria';
import { CategoriaService } from '../shared/categoria.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.page.html',
  styleUrls: ['./form-categoria.page.scss'],
})
export class FormCategoriaPage implements OnInit {
  titulo: string = 'Nova categoria';
  public categoria!: Categoria;
  public formCategoria!: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private categoriaService: CategoriaService
  ) {
    this.formCategoria = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
    });
  }


  ngOnInit() {
    this.categoria = new Categoria();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.titulo = 'Editar categoria';
      this.carregaCategoria(parseInt(idParam));
    }
  }

  async carregaCategoria(id: number) {
    this.categoria = await this.categoriaService.getById(id);
  }

  async onSubmit() {
    try {
      const resultado  = await this.categoriaService.save(this.categoria);
      this.categoria.id = resultado.insertId;
      this.toast.success('Categoria salva com sucesso');
      this.nav.pop();
    } catch (error) {
      console.log(error);
      this.toast.error('Ocorreu um erro ao tentar salvar a Categoria.');
    }
  }

}

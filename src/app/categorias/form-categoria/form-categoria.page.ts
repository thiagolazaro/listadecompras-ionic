import { ToastService } from 'src/app/core/service/toast.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../shared/categoria';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.page.html',
  styleUrls: ['./form-categoria.page.scss'],
})
export class FormCategoriaPage implements OnInit {
  titulo: string = 'Nova categoria';
  categoria!: Categoria;

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private categoriaService: CategoriaService
  ) { }

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
    console.log(this.categoria);
    try {
      const result  = await this.categoriaService.save(this.categoria);
      this.categoria.id = result.insertId;
      console.log(this.categoria.id);
      this.toast.success('Categoria salva com sucesso');
    } catch (error) {
      console.log(error);
      this.toast.error('Ocorreu um erro ao tentar salvar a Categoria.');
    }
  }

}

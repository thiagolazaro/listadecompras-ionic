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

  carregaCategoria(id: number) {
    return new Categoria();
  }

  onSubmit() {
    console.log(this.categoria);
    this.toast.success('Categoria salva com sucesso');
  }

}

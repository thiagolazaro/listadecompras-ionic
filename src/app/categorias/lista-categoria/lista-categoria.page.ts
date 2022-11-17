import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/service/alert.service';
import { ToastService } from 'src/app/core/service/toast.service';
import { Categoria } from '../shared/categoria';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.page.html',
  styleUrls: ['./lista-categoria.page.scss'],
})
export class ListaCategoriaPage implements OnInit {
  showPesquisar: boolean = false;
  categorias: Categoria[] = [];

  constructor(
    private toast: ToastService,
    private alert: AlertService,
    private categoriaService: CategoriaService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showCategorias();
  }

  async showCategorias() {
    for (let index = 1; index <= 10; index++) {
      const cat = new Categoria();
      cat.id = index;
      cat.nome = `Categoria ${index}`;

      this.categorias.push(cat);
    }
  }

  pesquisaButtonClick() {
    this.showPesquisar = true;
  }

  pesquisaBarCancel() {
    this.showPesquisar = false;
    this.showCategorias();
  }

  async pesquisaChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2){

    }
  }

  delete(categoria: Categoria) {
    this.alert.showConfirmDelete(categoria.nome, () => this.executeDelete(categoria));
  }

  private executeDelete(categoria: Categoria) {
    try {
      const index = this.categorias.indexOf(categoria);
      this.categorias.splice(index, 1);
      this.toast.success('Categoria excluída com sucesso.');
    } catch (error) {

    }
  }

}

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
    this.categorias = await this.categoriaService.getAll();
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
      this.categorias = await this.categoriaService.fillCategories(value);
    }
  }

  async delete(categoria: Categoria) {
    this.alert.showConfirmDelete(categoria.nome, () => this.executeDelete(categoria));
  }

  private async  executeDelete(categoria: Categoria) {
    try {
      // Primeiro aguardo remover do banco de dados
      await  this.categoriaService.delete(categoria);
      // Em seguida removo também do array sem precisar recarregar os dados
      const index = this.categorias.indexOf(categoria);
      this.categorias.splice(index, 1);
      this.toast.success('Categoria excluída com sucesso.');
    } catch (error) {

    }
  }

}

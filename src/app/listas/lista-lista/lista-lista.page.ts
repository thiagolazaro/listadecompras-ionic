import { AlertService } from './../../core/service/alert.service';
import { ToastService } from './../../core/service/toast.service';
import { Component, OnInit } from '@angular/core';
import { Lista } from '../shared/lista';
import { ListaService } from '../shared/lista.service';

@Component({
  selector: 'app-lista-lista',
  templateUrl: './lista-lista.page.html',
  styleUrls: ['./lista-lista.page.scss'],
})
export class ListaListaPage implements OnInit {
  showPesquisar: boolean = false;
  listas: Lista[] = [];

  constructor(
    private toast: ToastService,
    private alert: AlertService,
    private listaService: ListaService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showListas();
  }

  async showListas() {
    this.listas = await this.listaService.getAll();
  }

  pesquisaButtonClick() {
    this.showPesquisar = true;
  }

  pesquisaBarCancel() {
    this.showPesquisar = false;
    this.showListas();
  }

  async pesquisaChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2){
      this.listas = await this.listaService.fillListas(value);
    }
  }

  delete(lista: Lista) {
    this.alert.showConfirmDelete(lista.nome, () => this.executeDelete(lista));
  }

  private async executeDelete(lista: Lista) {
    try {
      await this.listaService.delete(lista);

      const index = this.listas.indexOf(lista);
      this.listas.splice(index, 1);
      this.toast.success('Lista excluída com sucesso.');
    } catch (error) {

    }
  }

}

import { AlertService } from './../../core/service/alert.service';
import { ToastService } from './../../core/service/toast.service';
import { Component, OnInit } from '@angular/core';
import { Lista } from '../shared/lista';

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
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showListas();
  }

  async showListas() {
    for (let index = 1; index <= 10; index++) {
      const lista = new Lista();
      lista.id = index;
      lista.nome = `Lista ${index}`;

      this.listas.push(lista);
    }
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

    }
  }

  delete(lista: Lista) {
    this.alert.showConfirmDelete(lista.nome, () => this.executeDelete(lista));
  }

  private executeDelete(lista: Lista) {
    try {
      const index = this.listas.indexOf(lista);
      this.listas.splice(index, 1);
      this.toast.success('Lista excluída com sucesso.');
    } catch (error) {

    }
  }

}

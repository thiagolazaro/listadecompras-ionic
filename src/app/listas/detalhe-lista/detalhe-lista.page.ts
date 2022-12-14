import { ListaService } from './../shared/lista.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/service/alert.service';
import { ToastService } from 'src/app/core/service/toast.service';
import { ProdutosService } from 'src/app/produtos/shared/produtos.service';
import { Lista } from '../shared/lista';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalhe-lista',
  templateUrl: './detalhe-lista.page.html',
  styleUrls: ['./detalhe-lista.page.scss'],
})
export class DetalheListaPage implements OnInit {
  showPesquisar: boolean = false;
  lista: Lista = new Lista();

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private alert: AlertService,
    private listaService: ListaService,
    private produtoService: ProdutosService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      await this.carregaLista(parseInt(idParam));
    }
  }

  async carregaLista(id: number) {
    this.lista = await this.listaService.getById(id);
  }


  pesquisaButtonClick() {
    this.showPesquisar = true;
  }

  pesquisaBarCancel() {
    this.showPesquisar = false;
  }

  async pesquisaChange($event: any) {
    const value = $event.target.value;
    if (value && value.length >= 2){
    }
  }

  delete() {
    this.alert.showConfirmDelete('', () => this.executeDelete());
  }

  private async executeDelete() {
    try {
      this.toast.success('Lista excluída com sucesso.');
    } catch (error) {
      this.toast.error('Ocorreu um erro ao tentar excluir o Produto');
    }
  }

}

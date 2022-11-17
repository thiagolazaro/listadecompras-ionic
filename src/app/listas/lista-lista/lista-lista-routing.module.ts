import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaListaPage } from './lista-lista.page';

const routes: Routes = [
  {
    path: '',
    component: ListaListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaListaPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheListaPage } from './detalhe-lista.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheListaPageRoutingModule {}

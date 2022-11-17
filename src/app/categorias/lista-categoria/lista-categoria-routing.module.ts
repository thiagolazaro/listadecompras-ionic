import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaCategoriaPage } from './lista-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaCategoriaPageRoutingModule {}

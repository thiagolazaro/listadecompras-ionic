import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaListaPageRoutingModule } from './lista-lista-routing.module';

import { ListaListaPage } from './lista-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaListaPageRoutingModule
  ],
  declarations: [ListaListaPage]
})
export class ListaListaPageModule {}

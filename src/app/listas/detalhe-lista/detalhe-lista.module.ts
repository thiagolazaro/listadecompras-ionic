import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheListaPageRoutingModule } from './detalhe-lista-routing.module';

import { DetalheListaPage } from './detalhe-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheListaPageRoutingModule
  ],
  declarations: [DetalheListaPage]
})
export class DetalheListaPageModule {}

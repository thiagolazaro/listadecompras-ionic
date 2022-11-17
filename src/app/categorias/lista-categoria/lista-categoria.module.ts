import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaCategoriaPageRoutingModule } from './lista-categoria-routing.module';

import { ListaCategoriaPage } from './lista-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaCategoriaPageRoutingModule
  ],
  declarations: [ListaCategoriaPage]
})
export class ListaCategoriaPageModule {}

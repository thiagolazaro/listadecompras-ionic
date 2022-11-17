import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormListaPageRoutingModule } from './form-lista-routing.module';

import { FormListaPage } from './form-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormListaPageRoutingModule
  ],
  declarations: [FormListaPage]
})
export class FormListaPageModule {}

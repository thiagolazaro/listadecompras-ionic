import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormListaPageRoutingModule } from './form-lista-routing.module';

import { FormListaPage } from './form-lista.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    FormListaPageRoutingModule
  ],
  declarations: [FormListaPage]
})
export class FormListaPageModule {}

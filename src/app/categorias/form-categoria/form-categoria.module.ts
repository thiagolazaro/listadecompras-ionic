import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCategoriaPageRoutingModule } from './form-categoria-routing.module';

import { FormCategoriaPage } from './form-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCategoriaPageRoutingModule
  ],
  declarations: [FormCategoriaPage]
})
export class FormCategoriaPageModule {}

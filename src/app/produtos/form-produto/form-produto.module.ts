import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormProdutoPageRoutingModule } from './form-produto-routing.module';

import { FormProdutoPage } from './form-produto.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    FormProdutoPageRoutingModule
  ],
  declarations: [FormProdutoPage]
})
export class FormProdutoPageModule {}

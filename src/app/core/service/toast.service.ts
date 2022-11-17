import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastController) { }


  success(message: string) {
    this.show(message, 'success', 'Sucesso');
  }

  error(message: string) {
    this.show(message, 'danger', 'Erro');
  }

  private async show(message: string, color: string, header: string ) {
    const toast = await this.toast.create({
      header: header,
      message: message,
      color: color,
      position: 'bottom',
      duration: 1000
    });
  }
}

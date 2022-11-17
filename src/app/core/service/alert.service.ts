import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async showConfirmDelete(name: string, actionRemove: () => void) {
    const alert = await this.alertController.create({
      header: 'Deletar?',
      message: `Deseja excluir o item: ${name}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Remover',
          handler: () => {
            actionRemove();
          }
        }
      ]
    });

    alert.present();
  }
}

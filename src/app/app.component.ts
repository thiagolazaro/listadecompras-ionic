import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DatabaseService } from './core/service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private db: DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Todas as vezes que o aplicativo iniciar
      // ele vai abrir o openDatabase()
      this.db.openDatabase();
    })
  }
}

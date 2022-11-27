import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Lista } from './lista';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  constructor(
    private db: DatabaseService
  ) { }

  save(lista: Lista) {
    if (lista.id) {
      return this.update(lista);
    } else {
      return this.insert(lista);
    }
  }

  insert(lista: Lista) {
    const sql = 'insert into listas (nome) values (?)';
    const data = [lista.nome];

    return this.db.executeSQL(sql, data);
  }

  update(lista: Lista) {
    const sql = 'update listas set nome = ? where id = ?;';
    const data = [lista.nome, lista.id];

    return this.db.executeSQL(sql, data);
  }

  delete(lista: Lista) {
    const sql = 'delete from listas where id = ?';
    const data = [lista.id];

    return this.db.executeSQL(sql, data);
  }

  fillListas(rows: any) {
    const listas: Lista[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);

      const lista = new Lista();
      lista.id = item.id;
      lista.nome = item.nome;

      listas.push(lista);
    }

    return listas;
  }

  async getAll() {
    const sql = 'select * from listas';
    const resultado = await this.db.executeSQL(sql);
    const listas = this.fillListas(resultado.rows);
    return listas;
  }

  async filter(text: string) {
    const sql = 'select* from listas where nome like ?';
    const data = [`%%${text}`];

    const resultado = await this.db.executeSQL(sql, data);
    const listas = this.fillListas(resultado.rows);
    return listas;
  }

  async getById(id: number) {
    const sql = 'select * from listas where id = ?';
    const data = [id];
    const resultado = await this.db.executeSQL(sql, data);
    const registro = resultado.rows;
    const lista = new Lista();

    if (registro) {
      const item = registro.item(0);
      lista.id = item.id;
      lista.nome = item.nome;
    }

    return lista;
  }

}

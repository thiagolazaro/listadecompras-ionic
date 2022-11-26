import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private db: DatabaseService
  ) { }

  save(categoria: Categoria) {
    if (categoria.id) {
      return this.update(categoria);
    } else {
      return this.insert(categoria);
    }
  }

  insert(categoria: Categoria) {
    const sql = 'insert into categorias (nome) values (?)';
    const data = [categoria.nome];

    return this.db.executeSQL(sql, data);
  }

  update(categoria: Categoria) {
    const sql = 'update categorias set nome = ? where id = ?';
    const data = [categoria.nome, categoria.id];

    return this.db.executeSQL(sql, data);
  }

  async getById(id: number) {
    const sql = 'select * from categorias where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const categoria = new Categoria();
    // Verifico se existe linha retornada e se é maior que 0
    if (rows && rows.lenght > 0) {
      // item recebe a categoria selecionado pelo id
      const item = rows.item(0);
      // Na sequencia passo para o objeto categoria
      categoria.id = item.id;
      categoria.nome = item.nome;
    }

    return categoria;
  }
}

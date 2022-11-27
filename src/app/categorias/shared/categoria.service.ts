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
    const sql = 'update categorias set nome = ? where id = ?;';
    const data = [categoria.nome, categoria.id];

    return this.db.executeSQL(sql, data);
  }

  delete(categoria: Categoria) {
    const sql = 'delete from categorias where id = ?;';
    const data = [categoria.id];

    return this.db.executeSQL(sql, data);
  }

  // Popula um array de categorias com os dados que veio do banco
  fillCategories(rows: any) {
    const categorias: Categoria[] = [];

    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);

      const categoria = new Categoria();
      categoria.id = item.id;
      categoria.nome = item.nome;

      categorias.push(categoria);
    }

    return categorias;
  }

  async getAll() {
    const sql = 'select * from categorias;';
    const resultado = await this.db.executeSQL(sql);
    const categorias = this.fillCategories(resultado.rows);
    return categorias;
  }

  async filter(text: string) {
    const sql = 'select * from categorias where name like ?;';
    const data = [`%${text}%`];

    const resultado = await this.db.executeSQL(sql, data);
    const categorias = this.fillCategories(resultado.rows);
    return categorias;
  }

  async getById(id: number) {
    const sql = 'select * from categorias where id = ?';
    const data = [id];
    const resultado = await this.db.executeSQL(sql, data);
    const registro = resultado.rows;
    const categoria = new Categoria();
    console.log(resultado);
    // Verifico se existe registro retornado e se é maior que 0
    if (registro) {
      console.log('dentro da condição');
      const item = registro.item(0);
      categoria.id = item.id;
      categoria.nome = item.nome;
    }

    return categoria;
  }
}

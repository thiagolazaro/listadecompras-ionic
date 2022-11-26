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

    this.db.executeSQL(sql, data);
    return this.db.executeSQL('select * from categorias;');
  }

  delete(categoria: Categoria) {
    const sql = 'delete form categorias where id = ?;';
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
    const sql = 'select * from categorias where id = ?;';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    console.log('getById',result)
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

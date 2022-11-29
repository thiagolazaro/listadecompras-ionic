import { Lista } from './../../listas/shared/lista';
import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/service/database.service';
import { Produto } from './produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    private db: DatabaseService
  ) { }

  save(produto: Produto) {
    if (produto.id) {
      return this.update(produto);
    } else {
      return this.insert(produto);
    }
  }

  private insert(produto: Produto) {
    const sql = 'insert into lista_itens (lista, categoria, nome, quantidade, sequencia, comprada) values (?, ?, ?, ?, ?, ?)';
    const data = [produto.lista, produto.categoria, produto.nome, produto.quantidade, produto.sequencia, 0];

    return this.db.executeSQL(sql, data);
  }

  private update(produto: Produto) {
    const sql = 'update lista_itens set categoria = ?, nome = ?, quantidade = ? where id = ?';
    const data = [produto.categoria, produto.nome, produto.quantidade, produto.id];
  }

  async getById(id: number) {
    const sql = 'select * from lista_itens where id = ?';
    const data = [id];
    const resultado = await this.db.executeSQL(sql, data);
    const registro = resultado.rows;
    const produto = new Produto();
    console.log(resultado);
    // Verifico se existe registro retornado e se é maior que 0
    if (registro) {
      const item = registro.item(0);
      produto.id = item.id;
      produto.lista = item.Lista;
      produto.categoria = item.categoria;
      produto.nome = item.nome;
      produto.quantidade = item.quantidade;
      produto.sequencia = item.sequencia;
      produto.comprada = (item.comprada == 1);
    }

    return produto;
  }
}

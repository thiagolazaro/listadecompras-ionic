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

  // Verifica a quantidade de um produto na lista
  async addQuantidadeProduto(listaId: number, categoriaId: number) {
    // Exemplo:  COUNT(id) as quantidade
    // Tem que dar um nome para poder pegar o retorno da função, tipo AVG entre outros
    // Porque o provider do SQLite não sabe definir um nome automaticamente
    const sql = 'select COUNT(id) as quantidade from lista_itens where lista = ? and categoria = ?';
    const data = [listaId, categoriaId];

    const resultado = await this.db.executeSQL(sql, data);
    const registro = resultado.rows;
    let quantidade: number = 0;

    if (registro) {
      const item = registro.item(0);
      // Passo para a variavel a quantidade de um produto da lista
      // Para fazer o incremento
      quantidade = item.quantidade;
    }

    // Incremento a quantidade produto
    quantidade++;
    return quantidade;
  }

  // Fazendo um join entra as duas tabelas
  getSearchQuery(hastextoFiltro: boolean = false) {
    const sqlBuilder = [];
    sqlBuilder.push('select ');
    sqlBuilder.push('c.id categoriaId');
    sqlBuilder.push('c.nome categoriaNome');
    sqlBuilder.push('i.id');
    sqlBuilder.push('i.nome');
    sqlBuilder.push('i.quantidade');
    sqlBuilder.push('i.sequencia');
    sqlBuilder.push('i.comprada');
    sqlBuilder.push('from');
    sqlBuilder.push('lista_itens i inner join listas l on i.id = l.id inner join categorias c on i.id = c.i');
    sqlBuilder.push('where');
    sqlBuilder.push('i.id = ?');
    if (hastextoFiltro) {
      sqlBuilder.push('and i.nome like ?')
    }
    sqlBuilder.push('order by c.nome, i.sequencia')

    return sqlBuilder.join(' ');
  }

  private fillProdutos(linhas: any) {
    const produtos: any[] = [];

    for (let i = 0; i < linhas.length; i++) {
      const item = linhas.item(i);
      const produtoPorCategoria: any = {};
      produtoPorCategoria.categoriaId = item.categoriaId;
      produtoPorCategoria.categoriaNome = item.categoriaNome;
      produtoPorCategoria.id = item.id;
      produtoPorCategoria.nome = item.nome;
      produtoPorCategoria.quantidade = item.quantidade;
      produtoPorCategoria.sequencia = item.sequencia;
      produtoPorCategoria.comprada = (item.comprada == 1);

      produtos.push(produtoPorCategoria);
    }

    return produtos;
  }

  async getAll(lista: number) {
    const sql = this.getSearchQuery();
    const data = [lista];

    const resultado = await this.db.executeSQL(sql, data);
    const produtos = this.fillProdutos(resultado.rows);
    return produtos;
  }

  async filter(lista: number, texto: string) {
    const sql = this.getSearchQuery(true);
    const data = [lista, `%${texto}%`];

    const resultado = await this.db.executeSQL(sql, data);
    const produtos = this.fillProdutos(resultado.rows);
    return produtos;
  }
}

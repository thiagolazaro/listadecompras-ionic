import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { DatabaseSeed } from '../database-seed';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseName: string = 'shoppinglist.db';
  db!: SQLiteObject;

  constructor(
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter
  ) { }

  // Responsável por abrir o banco de dados
  async openDatabase() {
    try {
      // Método default para abrir database SQLite
      this.db = await this.sqlite.create({ name: this.databaseName, location: 'default' })
      // Variavel para definir se o banco de dado foi criado ou não
      // Recebe o metodo de criar a estruta da database com seeds
      // o retorno é true ou false;
      const isDbCreated = await this.createDatabase();

      // Se o banco de dados foi criado
      if (isDbCreated) {
        // Posso fazer import de dados
      }

    } catch (error) {
      console.error('Ocorreu umerro ao criar o banco de dados', error);
    }
  }

  // Responsável por criar as tabelas no banco de dado
  private async createDatabase() {
    // Recebo o estrutura de script da classe DatabaseSeed - para criar a estrutura
    const sqlCreateDatabase = DatabaseSeed.getDatabaseSeed();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase);
    return result ? true : false;
  }

  // Método para executar query no banco de dados
  executeSQL(sql: string, params?: any[]) {
    // Exemplo
    // const resultQuery = await this.executeSQL('select * from categorias where id =?', [1]);
    // Retorno exemplo
    // {
    //   insertID: 0; se for insert retorna o id
    //   row: fn,  se for consulta retorna as linhas
    //   rowsAffected: 0, retorna quantidade de linhas afetadas
    // }
    return this.db.executeSql(sql, params);
  }

  // Método para executar por transação - recebe um array de objetos
  // O objeto do sqlStatement é um array que tem propriedade sql que é uma string
  // e propriedade data que é os parametros
  executeSQLWithTransaction(sqlStatement: any[]) {
    // Inicio uma transação no banco de dados
    return this.db.transaction((tx) => {
      // Para cada sql do array
      // vai executar o tx.executeSQL - passando qual é query e os parametros
      sqlStatement.forEach((sqlStatement: any) => {
        tx.executeSql(sqlStatement.sql, sqlStatement.data);
      });
    });
  }
}

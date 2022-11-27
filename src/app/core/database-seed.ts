export class DatabaseSeed {

  static getDatabaseSeed() {
    return this.getCreateTable();
  }

  // Método para criar as tabelas
  private static getCreateTable() {
    const sqls = [];

    // Scripts para criar as tabelas
    sqls.push('CREATE TABLE IF NOT EXISTS configuracoes (chave  varchar(100), valor varchar(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS categorias (id integer primary key AUTOINCREMENT,  nome varchar(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS listas (id integer primary key AUTOINCREMENT, nome varchar(100));');
    sqls.push('CREATE TABLE IF NOT EXISTS lista_itens (id integer primary key AUTOINCREMENT, lista integer, categoria integer, nome varchar(100), sequencia integer, comprada numeric(1), valor integer);');

    // Join com \n para criar linha em cada script
    return sqls.join('\n');
  }
}

const sqlite3 = require('sqlite3').verbose();

// Caminho exato do banco de dados real fornecido
const dbPath = './src/database/database.db';

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
    return;
  }
  console.log('Conectado ao banco de dados real com sucesso!');
});

db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) {
    console.error('Erro ao buscar tabelas:', err.message);
    return;
  }
  
  if (!tables || tables.length === 0) {
    console.log('Nenhuma tabela encontrada no banco.');
    db.close();
    return;
  }

  console.log('Tabelas encontradas:', tables.map(t => t.name));

  tables.forEach(t => {
    // Varre as colunas mais comuns para nome de produtos
    ['nome', 'name', 'title', 'titulo'].forEach(col => {
      const query = `UPDATE ${t.name} SET ${col} = 'Feijoada Família Premium' WHERE ${col} LIKE '%Fam%lia%'`;
      db.run(query, function(err) {
        if (!err && this.changes > 0) {
          console.log(`✅ Corrigido com sucesso na tabela "${t.name}", coluna "${col}"! Linhas atualizadas: ${this.changes}`);
        }
      });
    });
  });

  setTimeout(() => {
    db.close();
    console.log('Operação finalizada e conexão fechada.');
  }, 1000);
});
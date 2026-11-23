CREATE TABLE IF NOT EXISTS usuario (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nome TEXT NOT NULL,

    email TEXT UNIQUE NOT NULL,

    senha TEXT NOT NULL,

    telefone TEXT

);

CREATE TABLE IF NOT EXISTS produto (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nome TEXT NOT NULL,

    descricao TEXT,

    preco REAL NOT NULL,

    estoque INTEGER DEFAULT 0,

    imagem TEXT

);

CREATE TABLE IF NOT EXISTS pedido (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    usuario_id INTEGER NOT NULL,

    valor_total REAL NOT NULL,

    status TEXT DEFAULT 'PENDENTE'

);

CREATE TABLE IF NOT EXISTS item_pedido (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    pedido_id INTEGER NOT NULL,

    produto_id INTEGER NOT NULL,

    quantidade INTEGER NOT NULL,

    preco_unitario REAL NOT NULL

);
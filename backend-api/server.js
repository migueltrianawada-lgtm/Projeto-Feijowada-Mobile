require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

const db = require("./src/config/database");

// --- CONFIGURAÇÃO DO MERCADO PAGO ---
const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN || "SEU_ACCESS_TOKEN_DE_TESTE_AQUI"
});

const app = express();

app.use(cors());
app.use(express.json());

const sqlFile = path.join(__dirname, "src", "database", "init.sql");
const sql = fs.readFileSync(sqlFile, "utf8");

db.exec(sql, (err) => {
  if (err) {
    console.error("Erro ao criar tabelas:", err);
    return;
  }
  console.log("Tabelas criadas.");
});

// --- ROTA PARA GERAR PREFERÊNCIA DE PAGAMENTO NO MERCADO PAGO ---
app.post("/pagamento/criar-preferencia", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Nenhum item enviado para pagamento." });
    }

    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.nome || item.title || "Pedido Feijowada",
          quantity: Number(item.quantidade || item.quantity) || 1,
          unit_price: Number(item.preco || item.unit_price),
          currency_id: "BRL"
        })),
        back_urls: {
          success: "https://www.mercadopago.com.br",
          failure: "https://www.mercadopago.com.br",
          pending: "https://www.mercadopago.com.br"
        },
        auto_return: "approved"
      }
    });

    return res.json({
      init_point: response.sandbox_init_point || response.init_point
    });
  } catch (error) {
    console.error("Erro ao gerar preferência no Mercado Pago:", error);
    return res.status(500).json({ error: "Erro ao criar preferência de pagamento" });
  }
});

// --- ROTAS DA API ---
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  return res.json({
    projeto: "Feijowada API",
    status: "online"
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
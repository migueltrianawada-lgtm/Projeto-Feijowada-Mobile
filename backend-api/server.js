require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const authRoutes =
require("./src/routes/authRoutes");

const userRoutes =
require("./src/routes/userRoutes");

const productRoutes =
require("./src/routes/productRoutes");

const orderRoutes =
require("./src/routes/orderRoutes");

const app =
express();

const fs = require("fs");
const path = require("path");

const db =
require("./src/config/database");



app.use(cors());
app.use(express.json());

const sqlFile =
path.join(
  __dirname,
  "src",
  "database",
  "init.sql"
);

const sql =
fs.readFileSync(
  sqlFile,
  "utf8"
);

db.exec(
  sql,
  (err) => {

    if (err) {

      console.error(
        "Erro ao criar tabelas:",
        err
      );

      return;

    }

    console.log(
      "Tabelas criadas."
    );

  }
);


app.use(
  "/auth",
  authRoutes
);

app.use(
  "/users",
  userRoutes
);

app.use(
  "/products",
  productRoutes
);

app.use(
  "/orders",
  orderRoutes
);

app.get(
  "/",
  (
    req,
    res
  ) => {

    return res.json({
      projeto:
      "Feijowada API",
      status:
      "online"
    });

  }
);

const PORT =
process.env.PORT || 3000;

if(
 process.env.NODE_ENV !==
 "test"
){

 app.listen(
  PORT,
  () => {

   console.log(
    `Servidor rodando na porta ${PORT}`
   );

  }
 );

}

module.exports =
app;
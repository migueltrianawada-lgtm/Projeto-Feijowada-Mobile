const sqlite3 =
require("sqlite3").verbose();

function createDatabase() {

  if (
    process.env.NODE_ENV ===
    "test"
  ) {

    return new sqlite3.Database(
      ":memory:"
    );

  }

  return new sqlite3.Database(
    "./src/database/database.db",
    (err) => {

      if (err) {

        console.error(
          "Erro SQLite:",
          err
        );

        return;

      }

      console.log(
        "SQLite conectado"
      );

    }
  );

}

module.exports =
createDatabase;

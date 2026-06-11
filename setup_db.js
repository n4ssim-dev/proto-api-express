const sqlite3 = require("sqlite3");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "proto.db");
const schemaPath = path.join(__dirname, "proto_db.sql");
const dataPath = path.join(__dirname, "populate_db.sql");

const schema = fs.readFileSync(schemaPath, "utf8");
const data = fs.readFileSync(dataPath, "utf8");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error("Erreur lors de la création du schéma :", err.message);
            process.exit(1);
        }
        console.log("Schéma créé avec succès.");

        db.exec(data, (err) => {
            if (err) {
                console.error("Erreur lors du peuplement de la base :", err.message);
                process.exit(1);
            }
            console.log("Base de données peuplée avec succès.");
            db.close();
        });
    });
});

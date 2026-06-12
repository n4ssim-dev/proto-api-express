const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3");

const cheminDB = path.join(__dirname, "proto.db");
const cheminSchema = path.join(__dirname, "proto_db.sql");
const cheminData = path.join(__dirname, "populate_db.sql");

const schema = fs.readFileSync(cheminSchema, "utf8");
const data = fs.readFileSync(dataPath, "utf8");
const db = new sqlite3.Database(cheminDB);

db.serialize(() => {

    db.exec(schema, (err) => {

        if (err) {
            console.error("Erreur dans la création", err.message);
            process.exit(1);
        }
        console.log("Schéma créé avec succès.");

        db.exec(data, (err) => {
            
            if (err) {
                console.error("Erreur dans le peuplement:", err.message);
                process.exit(1);
            }
            console.log("BDD peuplée avec succès.");
            
            db.close();
        });
    });
});
// Import des dépendences
const path = require("path");
const sqlite3 = require("sqlite3");


exports.getDossierByPatientId = (req,res) => {
    let id = req.body.id;

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`SELECT * FROM dossier_administratif WHERE idPatient = ?`, [id],
        (err, dossier) => {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Fermeture de la connexion.");
            });

            if (err) {
                console.error(err.message);
                return res.status(500).json({ "message": "Erreur serveur" });
            }

            if (!dossier) {
                return res.status(404).json(
                    {"message": "Ce patient n'a pas de dossier."}
                )
            }

            return res.status(200).json(
                {
                    "Dossier": dossier
                }
            );
        }
    );
}

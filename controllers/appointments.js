// Import des dépendences
const path = require("path");
const sqlite3 = require("sqlite3");


exports.getRdvByDate = (req,res,next) => {
    let date = req.body.date;

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.all(`SELECT idRdv, date_rdv, idService, idPatient, idMedecin, raison_rdv FROM rendez_vous WHERE date(date_rdv) = date(?)`, [date],
        (err, rows) => {
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

            return res.status(200).json(
                {
                    "rendez_vous": rows
                }
            );
        }
    );
}

exports.addRdv = (req,res,next) => {
    let rdvDateRdv = req.body.date_rdv
    let rdvIdService = req.body.idService
    let rdvIdPatient = req.body.idPatient
    let rdvIdMedecine = req.body.idMedecin
    let rdvRaisonRdv = req.body.raison_rdv

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`INSERT INTO rendez_vous (idRdv, date_rdv, idService, idPatient, idMedecin, raison_rdv) VALUES ((SELECT IFNULL(MAX(idRdv), 0) + 1 FROM rendez_vous), ?, ?, ?, ?, ?)`, [rdvDateRdv, rdvIdService, rdvIdPatient, rdvIdMedecine, rdvRaisonRdv],
        (err, rdv) => {
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

            
            return res.status(200).json(
                {
                "message": "ajout rendez_vous réussi",
                
                }
            );
        }
    );
}

exports.getAllRdv = (req,res) => {
    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.all(`SELECT * FROM rendez_vous `, [],
        (err, rdv) => {
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

            
                return res.status(200).json(
                {
                rdv:rdv
                }
            );
        }
    );
}
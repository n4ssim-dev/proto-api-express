exports.getMedecinById = (req,res) => {
    let id = req.body.id;

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`SELECT idMedecin, idService, specialite, nom_medecin, prenom_medecin FROM medecin WHERE idMedecin = ?`, [id],
        (err, medecin) => {
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

            if (!medecin) {
                return res.status(404).json(
                    {"message": "Ce médecin n'existe pas."}
                )
            }

            return res.status(200).json(
                {
                    "medecin": medecin
                }
            );
        }
    );
}

exports.getMedecineByServiceId = (req,res) => {
    let idService = req.body.idService;

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.all(`SELECT idMedecin, idService, specialite, nom_medecin, prenom_medecin FROM medecin WHERE idService = ?`, [idService],
        (err, medecins) => {
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
                    "medecins": medecins
                }
            );
        }
    );
}
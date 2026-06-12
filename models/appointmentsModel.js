const dbUtils = require("../utils/db")

exports.getRdvByDatex =  (date) => {
    return new Promise((resolve, reject) => {
        const db = dbUtils.connectDb()
        db.all(`SELECT idRdv, date_rdv, idService, idPatient, idMedecin, raison_rdv FROM rendez_vous 
            WHERE date(date_rdv) = date(?)`, [date],
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

            resolve(rows);
            });
    });
};


exports.getAllRdvs =  () => {
    return new Promise((resolve, reject) => {
        const db = dbUtils.connectDb()
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

            resolve(rdv);
            });
    });
};

exports.createRdv =  (rdvDateRdv, rdvIdService, rdvIdPatient, rdvIdMedecin, rdvRaisonRdv) => {
    return new Promise((resolve, reject) => {
        const db = dbUtils.connectDb()
        db.get(`INSERT INTO rendez_vous (idRdv, date_rdv, idService, idPatient, idMedecin, raison_rdv) VALUES ((SELECT IFNULL(MAX(idRdv), 0) + 1 FROM rendez_vous), ?, ?, ?, ?, ?)`, [rdvDateRdv, rdvIdService, rdvIdPatient, rdvIdMedecin, rdvRaisonRdv],
        (err, rdv) => {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Fermeture de la connexion.");
            });

            
            resolve({
                    "idRdv": this.lastID,
                    "date_rdv": rdvDateRdv,
                    "idService": rdvIdService,
                    "idPatient": rdvIdPatient,
                    "idMedecin": rdvIdMedecin,
                    "raison_rdv": rdvRaisonRdv
                });
            });
    });
};

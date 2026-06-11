app.get('/patientId', (req, res) => {
    let patient_id = req.body.id
    
    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`SELECT * FROM patient WHERE patient.idPatient = ?`, [patient_id],
        (err, patient) => {
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
                "Patient": {
                    "id": patient.idPatient,
                    "nom": patient.nom,
                    "prenom": patient.prenom,
                    "mail": patient.mail,
                    "N° SS": patient.NSS
                }
                }
            );
        }
    );
});



app.get('/patients', (req, res) => {
   
    
    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.all(`SELECT * FROM patient `, [],
        (err, patient) => {
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
                patient:patient
                }
            );
            
            
        }
    );
});


app.post("/addpatient", (req, res) => {
    let patient_mail = req.body.mail
    let patient_nss = req.body.nss
    let patient_nom = req.body.nom
    let patient_prenom = req.body.prenom

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`INSERT INTO patient (idPatient, nom, prenom, NSS, mail) VALUES ((SELECT IFNULL(MAX(idPatient), 0) + 1 FROM patient), ?, ?, ?, ?)`, [patient_nom, patient_prenom, patient_nss, patient_mail],
        (err, patient) => {
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
                "message": "ajout patient réussi",
                
                }
            );
        }
    );
})
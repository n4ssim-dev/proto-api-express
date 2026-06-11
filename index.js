const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const app = express();

app.use(express.json());

// Ici on lance une requete GET pour vérifier la connexion au serveur
app.get("/health", (req,res) => {
    return res.status(200).json(
        {"status": "healthy"}
    )
})

// Source - https://stackoverflow.com/a/53783495
// Posted by Paul, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-10, License - CC BY-SA 4.0

//Requete POST pour vérifier la présence des identifiants dans la BDD
app.post("/login", (req, res) => {
    let userMail = req.body.mail     //On déclare les variables qui seront récupérées dans le body du testeur d'API
    let userPassword = req.body.pass

    // Variable qui lance une fonction qui permet de se connecter à la BDD "proto" et de vérifier si la connexion est établie
    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });
    //Requete GET qui permet de recuperer des valeurs de la BDD correspondant au userMail indiqué dans le body
    db.get(`SELECT users.idUser, users.mail, users.password, roles.nom_role AS role 
        FROM users JOIN roles ON users.idRole = roles.idRole WHERE users.mail = ?`, [userMail],
        (err, user) => {
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log("Fermeture de la connexion.");
            });

            if (err) {   //Si erreur
                console.error(err.message);
                return res.status(500).json({ "message": "Erreur serveur" });
            }

            if (!user) {  //Si pas de résultat
                return res.status(401).json(
                    {"message": "Cette utilisateur n'existe pas."}
                )
            }

            if (userPassword != user.password) {  //Si le password indiqué dans le body est différent de celui récupéré dans la BDD
                return res.status(401).json(
                    {"message": "Identifiants invalides"}
                )
            }
            return res.status(200).json(   // Les IF ne sont pas validés, on affiche le résultat
                {
                "message": "Connexion réussie",
                "user": {
                    "id": user.idUser,
                    "mail": user.mail,
                    "role": user.role
                }
                }
            );
        }
    );
})

app.get('/patientId', (req, res) => {
    let patientId = req.body.id
    
    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`SELECT * FROM patient WHERE patient.idPatient = ?`, [patientId],
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

app.get('/allrdv', (req, res) => {
   
    
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
});


app.post("/addpatient", (req, res) => {
    let patienMail = req.body.mail
    let patientNss = req.body.nss
    let patientNom = req.body.nom
    let patientPrenom = req.body.prenom

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`INSERT INTO patient (idPatient, nom, prenom, NSS, mail) VALUES ((SELECT IFNULL(MAX(idPatient), 0) + 1 FROM patient), ?, ?, ?, ?)`, [patientNom, patientPrenom, patientNss, patientMail],
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

app.post("/addrdv", (req, res) => {
    let rdvDateRdv = req.body.date_rdv
    let rdvIdService = req.body.idService
    let rdvIdPatient = req.body.idPatient
    let rdvIdMedecin = req.body.idMedecin
    let rdvRaisonRdv = req.body.raison_rdv

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`INSERT INTO rendez_vous (idRdv, date_rdv, idService, idPatient, idMedecin, raison_rdv) VALUES ((SELECT IFNULL(MAX(idRdv), 0) + 1 FROM rendez_vous), ?, ?, ?, ?, ?)`, [rdvDateDdv, rdvIdService, rdvIdPatient, rdvIdMedecin, rdvRaisonRdv],
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
})

app.post("/user", (req, res) => {
    let { nom, prenom, mail, password, idRole } = req.body;

    if (!nom || !prenom || !mail || !password || !idRole) {
        return res.status(400).json(
            {"message": "Champs manquants"}
        )
    }

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.run(`INSERT INTO users (idUser, nom, prenom, password, mail, idRole) VALUES ((SELECT IFNULL(MAX(idUser), 0) + 1 FROM users), ?, ?, ?, ?, ?)`, [nom, prenom, password, mail, idRole],
        function (err) {
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

            return res.status(201).json(
                {
                    "message": "Utilisateur créé",
                    "user": {
                            "id": this.lastID,
                            "nom": nom,
                            "prenom": prenom,
                            "mail": mail,
                            "idRole": idRole
                        }
                }
            );
        }
    );
})



app.get("/rdv", (req, res) => {
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
})



app.get("/medecin", (req, res) => {
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
})



app.get("/medecin/service", (req, res) => {
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
})



app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
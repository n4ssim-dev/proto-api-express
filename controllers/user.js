// Import des dépendences
const path = require("path");
const sqlite3 = require("sqlite3");


exports.login = (req,res) => {
    // Source - https://stackoverflow.com/a/53783495
    // Posted by Paul, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-06-10, License - CC BY-SA 4.0
    let user_mail = req.body.mail
    let user_password = req.body.pass

    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`SELECT users.idUser, users.mail, users.password, roles.nom_role AS role FROM users JOIN roles ON users.idRole = roles.idRole WHERE users.mail = ?`, [user_mail],
        (err, user) => {
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

            if (!user) {
                return res.status(401).json(
                    {"message": "Cette utilisateur n'existe pas."}
                )
            }

            if (user_password != user.password) {
                return res.status(401).json(
                    {"message": "Identifiants invalides"}
                )
            }
            return res.status(200).json(
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
}

exports.addUser = (req,res) => {
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
}
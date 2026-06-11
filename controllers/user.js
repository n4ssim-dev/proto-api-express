const model = require("../models/model")
const findUserByMail = model.findUserByMail

exports.login = (req,res) => {
    let userMail = req.body.mail
    let userPassword = req.body.pass

    let user = findUserByMail(userMail)

    if (!user) {
        return res.status(401).json(
            {"message": "Cette utilisateur n'existe pas."}
        )
    } else if (userPassword != user.password) {
            return res.status(401).json(
            {"message": "Identifiants invalides"}
        )
    } else {
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
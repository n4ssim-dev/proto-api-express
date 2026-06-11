const dbUtils = require("../utils/db")

// Création model pour connection DB
// ---------
// db.get(`SELECT users.idUser, users.mail, users.password, roles.nom_role AS role 
// FROM users JOIN roles ON users.idRole = roles.idRole WHERE users.mail = ?`, [user_mail]
export default function findUserByMail (userMail) {
    const db = dbUtils.connectDb()
    const user = db.get(`SELECT users.idUser, users.mail, users.password, roles.nom_role AS role FROM users JOIN roles ON users.idRole = roles.idRole WHERE users.mail = ?`, [user_mail],
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

        return user;
        });
};

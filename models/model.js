const dbUtils = require("../utils/db")

// Création model pour connection DB
exports.findUserByMail = (userMail) => {
    return new Promise((resolve, reject) => {
        const db = dbUtils.connectDb()
        db.get(`SELECT users.idUser, users.mail, users.password, roles.nom_role AS role FROM users JOIN roles ON users.idRole = roles.idRole WHERE users.mail = ?`, [userMail],
            (err, user) => {
                db.close((closeErr) => {
                    if (closeErr) {
                        console.error(closeErr.message);
                    }
                    console.log("Fermeture de la connexion.");
                });

                if (err) {
                    console.error(err.message);
                    return reject(err);
                }

                resolve(user);
            });
    });
};

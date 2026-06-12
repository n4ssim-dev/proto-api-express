const dbUtils = require("../utils/db")

exports.findUserByMail = (userMail) => {
    return new Promise((resolve, reject) => {
        const db = dbUtils.connectDb()
        db.get(`SELECT users.idUser, users.mail, users.password, roles.nom_role AS role FROM users JOIN roles ON users.idRole = roles.idRole WHERE users.mail = ?`, [userMail],
            (err, user) => {
                               
                if (err) {
                    return reject(err);
                }

                resolve(user);
            });
    });
};

exports.addUser = (nom, prenom, password, mail, idRole) => {
    return new Promise((resolve, reject) => {
        const db = dbUtils.connectDb()

        db.run(`INSERT INTO users (idUser, nom, prenom, password, mail, idRole) 
            VALUES ((SELECT IFNULL(MAX(idUser), 0) + 1 FROM users), ?, ?, ?, ?, ?)`, 
            [nom, prenom, password, mail, idRole],

            function (err) {
                
                if (err) {
                    return reject(err);
                }


                resolve({
                    "id": this.lastID,
                    "nom": nom,
                    "prenom": prenom,
                    "mail": mail,
                    "idRole": idRole
                });
            }
        );
    })
}


exports.deleteUserById = (id) => {
    return new Promise((resolve, reject) => {
        const db = dbUtils.connectDb();

        db.run(
            `DELETE FROM users WHERE idUser = ?`,
            [id],
            function (err) {
                
                if (err) {
                    return reject(err);
                }

                resolve(this.changes); // 0 si aucun user supprimé, 1 si supprimé
                
            }
        );
        
    });  
};

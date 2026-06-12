const model = require("../models/userModel")
const findUserByMail = model.findUserByMail
const addUser = model.addUser
const deleteUserById = model.deleteUserById
const modifUser = model.modifUser

exports.login = async (req,res) => {
    let userMail = req.body.mail
    let userPassword = req.body.pass

    try {
        let user = await findUserByMail(userMail)

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
    } catch (err) {
        return res.status(500).json({ "message": "Erreur serveur" });
    }
}

exports.addUser = async (req,res) => {
    let { nom, prenom, mail, password, idRole } = req.body;

    if (!nom || !prenom || !mail || !password || !idRole) {
        return res.status(400).json(
            {"message": "Champs manquants"}
        )
    }

    try {
        let user = await addUser(nom, prenom, password, mail, idRole)

        return res.status(201).json(
            {
                "message": "Utilisateur créé",
                "user": user
            }
        );
    } catch (err) {
        return res.status(500).json({ "message": "Erreur serveur" });
    }
}


exports.deleteUserById = async (req, res) => {
    const id = req.body.id;

    try {
        const deletedCount = await deleteUserById(id);

        if (deletedCount === 0) {
            return res.status(404).json({
                message: "Cet utilisateur n'existe pas."
            });
        }

        return res.status(200).json({
            message: "Utilisateur effacé"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Erreur serveur",
            error: err.message
        });
    }
};


exports.modifUserById = async (req,res) => {
    let { id, nom, prenom, mail, password, idRole } = req.body;
 
    if (!id || !nom || !prenom || !mail || !password || !idRole) {
        return res.status(400).json(
            {"message": "Champs manquants"}
        )
    }

    try { 
        let user = await modifUser(id, nom, prenom, mail, password, idRole);

        return res.status(201).json(
            {
                "message": "Utilisateur modifié",
            }
        );
    } catch (err) {
    console.error(err);

    return res.status(500).json({
        message: "Erreur serveur",
        error: err.message
    });
}
}


const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const app = express();

app.use(express.json());


app.get("/health", (req,res) => {
    return res.status(200).json(
        {"status": "healthy"}
    )
})

// Source - https://stackoverflow.com/a/53783495
// Posted by Paul, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-10, License - CC BY-SA 4.0
app.post("/", (req, res) => {
    let db = new sqlite3.Database(path.resolve("proto.db"), (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connection avec succès à la base de données SQLite.");
    });

    db.get(`SELECT * FROM users WHERE idUser = ?`, [req.body.id], (err, row) => {
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

    res.status(200).json(row);
    });
});


app.post("/login", (req,res) => {
    let user_mail = req.body.mail
    let user_password = req.body.pass
    let user = users.find(o => o.mail === user_mail);

    if (user && user_password != user.pass) {
        return res.status(401).json(
            {"message": "Identifiants invalides"}
        )

    } else if (!user) {
        return res.status(401).json(
            {"message": "Cette utilisateur n'existe pas."}
        )
    } 
    
    else {
        return res.status(200).json(
            {
            "message": "Connexion réussie",
            "user": {
                "id": user.id,
                "mail": user.mail,
                "role": user.role
            }
            }
        );
    }
})


app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
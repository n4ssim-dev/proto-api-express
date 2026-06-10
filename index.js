const express = require("express");
const app = express();

app.use(express.json());


const users = [
    { mail: "Alice@gmail.com", id: 0, pass: "azerty", role: "admin" },
    { mail: "Bob@gmail.com", id: 1, pass: "qwerty", role: "admin" },
    { mail: "Charlie@gmail.com", id: 2, pass: "qwertz", role: "admin" },
    { mail: "admin@cliniqueplus.fr", id: 3, pass: "azerty", role: "admin" },
]

app.get("/health", (req,res) => {
    return res.status(200).json(
        {"status": "healthy"}
    )
})

app.post("/login", (req,res) => {
    let user_mail = req.body.mail
    let user_password = req.body.pass
    let user = users.find(o => o.mail === user_mail);

    if (user && user_password != user.pass) {
        return res.status(400).json(
            {"message": "Identifiants invalides"}
        )

    } else if (!user) {
        return res.status(400).json(
            {"message": "Cette utilisateur n'existe pas."}
        )
    } 
    
    else if (user_password == user.pass && user_email == user.email) {
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
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const rdvRoutes = require("./routes/appointments")

const app = express();

app.use(express.json());


app.get("/health", (req,res) => {
    return res.status(200).json(
        {"status": "healthy"}
    )
})

//Définition des routes
app.use('/rdv', rdvRoutes);

module.exports = app;


app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
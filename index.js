const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const rdvRoutes = require("./routes/appointments")
const medecinRoutes = require("./routes/medecins")
const patientsRoutes = require("./routes/patients")
const userRoutes = require("./routes/user")
const dossiersRoutes = require("./routes/dossiers")

const app = express();
app.use(express.json());

// Route test
app.get("/health", (req,res) => {
    return res.status(200).json(
        {"status": "healthy"}
    )
})

// ROUTES
app.use('/rdv', rdvRoutes);
app.use('/medecins', medecinRoutes)
app.use('/patients', patientsRoutes)
app.use('/user', userRoutes)
app.use('/dossiers', dossiersRoutes)

module.exports = app;


app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
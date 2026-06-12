// Import des dépendences
const path = require("path");
const sqlite3 = require("sqlite3");
const appointmentsModel = require("../models/appointmentsModel")
const getRdvByDatex = appointmentsModel.getRdvByDatex;
const getAllRdvs = appointmentsModel.getAllRdvs;
const createRdv = appointmentsModel.createRdv;


exports.getRdvByDate = async (req,res) => {
    let userDate = req.body.date

    try{
        let results = await getRdvByDatex(userDate)

        if (!results) {
            return res.status(401).json(
                {"message": "Il n'y pas de dates correspondante."}
            )
        } else {
            return res.status(200).json(
                {
                "rendez-vous": results
                }
            );
        }
        

    } catch (err) {
        return res.status(500).json({ "message": "Erreur serveur" });
    }
}
   

           


exports.addRdv = async (req,res) => {
    let rdvDateRdv = req.body.date_rdv
    let rdvIdService = req.body.idService
    let rdvIdPatient = req.body.idPatient
    let rdvIdMedecin = req.body.idMedecin
    let rdvRaisonRdv = req.body.raison_rdv

    if (!rdvDateRdv || !rdvIdService || !rdvIdPatient || !rdvIdMedecin || !rdvRaisonRdv) {
        return res.status(400).json(
        {"message": "Champs manquants"}
        )
    }
        
    try{
        let results = await createRdv(rdvDateRdv,rdvIdService,rdvIdPatient,rdvIdMedecin,rdvRaisonRdv)

        return res.status(200).json(
                {
                "message": "ajout rendez_vous réussi",                
                }

        )
              

    } catch (err) {
        return res.status(500).json({ "message": "Erreur serveur" });
    }
}
   
    

exports.getAllRdv = async(req,res) => {
   
        try{
            let results = await getAllRdvs()

            if (!results) {
                return res.status(401).json(
                    {"message": "Il n'y pas de dates correspondante."}
                )
            } else {
            return res.status(200).json(
                    {
                    rdv:results
                    }
                
                );
            }
            

        } catch (err) {
            return res.status(500).json({ "message": "Erreur serveur" });
        }
}
   
            
                
        

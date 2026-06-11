# 1. Le projet
Prototype d'API Express pour le brief "CliniquePlus".

# 2. Comment installer et lancer le projet
Effectuer ces commandes dans un terminal à la racine du projet
```bash
npm install -g nodemon
npm install
nodemon 
```
Le serveur démarre sur `http://localhost:3000`.

La base de données utilisée est `proto.db` (SQLite). Pour la (re)créer et la peupler :
```bash
sqlite3 proto.db < proto_db.sql
sqlite3 proto.db < populate_db.sql
```

Si vous n'avez pas la commande `sqlite3` installée sur votre machine, un script Node équivalent est fourni :
```bash
npm run setup-db
```

# 3. Routes disponibles et comment les tester

| Méthode | Route | Description | Body JSON |
|---|---|---|---|
| GET | `/health` | Vérifie que le serveur tourne | - |
| POST | `/login` | Connexion d'un utilisateur | `{"mail": "admin@hopital.fr", "pass": "hashed_pwd_admin"}` |
| POST | `/user` | Création d'un utilisateur | `{"nom": "Dupont", "prenom": "Marie", "mail": "marie.dupont@mail.fr", "password": "motdepasse", "idRole": 3}` |
| POST | `/addrdv` | Création d'un rendez-vous | `{"date_rdv": "2026-06-10 11:30:00", "idService": "2", "idPatient": "5", "idMedecin": "4", "raison_rdv": "infection"}` |
| POST | `/addpatient` | Création d'un patient | `{"mail": "patient@gmail.com", "nss": "2980613456123", "nom": "Perry", "prenom": "Katie"}` |
| GET | `/rdv` | Liste les rendez-vous d'une date donnée | `{"date": "2025-07-15"}` |
| GET | `/patientId` | Liste un patient par ID | `{"id": 2}` |
| GET | `/patients` | Liste tous les patients | - |
| GET | `/allrdv` | Liste tous les rendez-vous | - |
| GET | `/medecin` | Récupère un médecin par son id | `{"id": 1}` |
| GET | `/medecin/service` | Liste les médecins d'un service donné | `{"idService": 1}` |

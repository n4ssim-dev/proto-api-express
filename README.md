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

# 3. Routes disponibles et comment les tester

## GET /health
Vérifie que le serveur tourne.
```bash
curl http://localhost:3000/health
```

## POST /login
Connexion d'un utilisateur.

Body JSON :
```json
{
  "mail": "admin@hopital.fr",
  "pass": "hashed_pwd_admin"
}
```

## POST /user
Création d'un utilisateur.

Body JSON :
```json
{
  "nom": "Dupont",
  "prenom": "Marie",
  "mail": "marie.dupont@mail.fr",
  "password": "motdepasse",
  "idRole": 3
}
```

## GET /rdv
Liste les rendez-vous d'une date donnée.

Body JSON :
```json
{
  "date": "2025-07-15"
}
```

## GET /medecin
Récupère un médecin par son id.

Body JSON :
```json
{
  "id": 1
}
```

## GET /medecin/service
Liste les médecins d'un service donné.

Body JSON :
```json
{
  "idService": 1
}
```

BEGIN TRANSACTION;
DROP TABLE IF EXISTS "demande_rappel";
CREATE TABLE "demande_rappel" (
	"idPatient"	INT,
	"idService"	INT,
	"message_rappel"	VARCHAR(255),
	PRIMARY KEY("idPatient","idService"),
	FOREIGN KEY("idPatient") REFERENCES "patient"("idPatient"),
	FOREIGN KEY("idService") REFERENCES "services"("idService")
);
DROP TABLE IF EXISTS "dossier_administratif";
CREATE TABLE "dossier_administratif" (
	"idPatient"	INT,
	"idService"	INT,
	"date_entree"	DATETIME,
	"date_sortie"	DATETIME,
	PRIMARY KEY("idPatient","idService"),
	FOREIGN KEY("idPatient") REFERENCES "patient"("idPatient"),
	FOREIGN KEY("idService") REFERENCES "services"("idService")
);
DROP TABLE IF EXISTS "medecin";
CREATE TABLE "medecin" (
	"idMedecin"	INT,
	"idService"	INT NOT NULL,
	"specialite"	VARCHAR(255),
	"nom_medecin"	VARCHAR(255),
	"prenom_medecin"	VARCHAR(255),
	PRIMARY KEY("idMedecin"),
	FOREIGN KEY("idService") REFERENCES "services"("idService")
);
DROP TABLE IF EXISTS "patient";
CREATE TABLE "patient" (
	"idPatient"	INT,
	"nom"	VARCHAR(255),
	"prenom"	VARCHAR(255),
	"mail"	VARCHAR(255),
	"NSS"	VARCHAR(255),
	PRIMARY KEY("idPatient")
);
DROP TABLE IF EXISTS "rendez_vous";
CREATE TABLE "rendez_vous" (
	"idRdv"	INT,
	"date_rdv"	DATETIME,
	"idService"	INT NOT NULL,
	"idPatient"	INT NOT NULL,
	"idMedecin"	INT NOT NULL,
	"raison_rdv"	VARCHAR(255),
	PRIMARY KEY("idRdv"),
	FOREIGN KEY("idMedecin") REFERENCES "medecin"("idMedecin"),
	FOREIGN KEY("idPatient") REFERENCES "patient"("idPatient"),
	FOREIGN KEY("idService") REFERENCES "services"("idService")
);
DROP TABLE IF EXISTS "roles";
CREATE TABLE "roles" (
	"idRole"	INT,
	"nom_role"	VARCHAR(50),
	"description"	VARCHAR(50),
	PRIMARY KEY("idRole")
);
DROP TABLE IF EXISTS "services";
CREATE TABLE "services" (
	"idService"	INT,
	"nom_service"	VARCHAR(255),
	PRIMARY KEY("idService")
);
DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
	"idUser"	INT,
	"nom"	VARCHAR(255),
	"prenom"	VARCHAR(255),
	"password"	VARCHAR(255),
	"mail"	VARCHAR(255),
	"idRole"	INT NOT NULL,
	PRIMARY KEY("idUser"),
	FOREIGN KEY("idRole") REFERENCES "roles"("idRole")
);
COMMIT;

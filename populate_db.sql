BEGIN TRANSACTION;

-- ============================================================
-- ROLES
-- ============================================================
INSERT INTO "roles" ("idRole", "nom_role", "description") VALUES
(1, 'admin',    'Administrateur'),
(2, 'medecin',  'Médecin'),
(3, 'staff',  'Employé');

-- ============================================================
-- SERVICES
-- ============================================================
INSERT INTO "services" ("idService", "nom_service") VALUES
(1, 'Cardiologie'),
(2, 'Pédiatrie'),
(3, 'Urgences'),
(4, 'Radiologie');

-- ============================================================
-- PATIENTS
-- ============================================================
INSERT INTO "patient" ("idPatient", "nom", "prenom", "mail", "NSS") VALUES
(1, 'Dupont',   'Marie',   'marie.dupont@mail.fr',   '2850134012345'),
(2, 'Martin',   'Jean',    'jean.martin@mail.fr',    '1760278056789'),
(3, 'Bernard',  'Sophie',  'sophie.bernard@mail.fr', '2910392034567'),
(4, 'Leroy',    'Pierre',  'pierre.leroy@mail.fr',   '1830456078901');

-- ============================================================
-- MEDECINS
-- ============================================================
INSERT INTO "medecin" ("idMedecin", "idService", "specialite", "nom_medecin", "prenom_medecin") VALUES
(1, 1, 'Cardiologue',   'Moreau',   'Éric'),
(2, 2, 'Pédiatre',      'Simon',    'Claire'),
(3, 3, 'Urgentiste',    'Laurent',  'Paul'),
(4, 4, 'Radiologue',    'Petit',    'Isabelle');

-- ============================================================
-- USERS
-- ============================================================
INSERT INTO "users" ("idUser", "nom", "prenom", "password", "mail", "idRole") VALUES
(1, 'Admin',    'Système',  'hashed_pwd_admin',   'admin@hopital.fr',           1),
(2, 'Moreau',   'Éric',     'hashed_pwd_moreau',  'eric.moreau@hopital.fr',     2),
(3, 'Simon',    'Claire',   'hashed_pwd_simon',   'claire.simon@hopital.fr',    2),
(4, 'Dupont',   'Marie',    'hashed_pwd_dupont',  'marie.dupont@mail.fr',       3),
(5, 'Martin',   'Jean',     'hashed_pwd_martin',  'jean.martin@mail.fr',        3);

-- ============================================================
-- DOSSIERS ADMINISTRATIFS
-- ============================================================
INSERT INTO "dossier_administratif" ("idPatient", "idService", "date_entree", "date_sortie") VALUES
(1, 1, '2025-03-10 08:30:00', '2025-03-12 11:00:00'),
(2, 3, '2025-04-05 14:00:00', '2025-04-05 18:30:00'),
(3, 2, '2025-05-20 09:00:00', '2025-05-22 10:00:00'),
(4, 4, '2025-06-01 10:15:00', NULL);  -- encore hospitalisé

-- ============================================================
-- RENDEZ-VOUS
-- ============================================================
INSERT INTO "rendez_vous" ("idRdv", "date_rdv", "idService", "idPatient", "idMedecin", "raison_rdv") VALUES
(1, '2025-07-15 09:00:00', 1, 1, 1, 'Suivi post-hospitalisation'),
(2, '2025-07-16 10:30:00', 2, 3, 2, 'Consultation pédiatrique'),
(3, '2025-07-17 14:00:00', 3, 2, 3, 'Douleurs abdominales'),
(4, '2025-07-18 11:00:00', 4, 4, 4, 'Radiographie thoracique');

-- ============================================================
-- DEMANDES DE RAPPEL
-- ============================================================
INSERT INTO "demande_rappel" ("idPatient", "idService", "message_rappel") VALUES
(1, 1, 'Rappeler pour résultats ECG'),
(2, 3, 'Confirmer ordonnance urgences'),
(3, 2, 'Renouvellement vaccins enfant');

COMMIT;
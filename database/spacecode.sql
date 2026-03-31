/*DROP TABLE Niveaux_termines; 
DROP TABLE Indices;
DROP TABLE Exercices;
DROP TABLE Utilisateur;
DROP TABLE Niveau;
DROP TABLE Cours;  */


CREATE TABLE IF NOT EXISTS Cours
(
  Id_cours INTEGER NOT NULL,
  Nom      VARCHAR NULL    ,
  PRIMARY KEY (Id_cours)
);



CREATE TABLE IF NOT EXISTS Exercices
(
  Id_exercice   INTEGER NOT NULL,
  Nom           VARCHAR NULL    ,
  Instruction   VARCHAR NULL    ,
  Code_exercice VARCHAR NULL    ,
  Code_solution VARCHAR NULL    ,
  Id_niveau     INTEGER NOT NULL,
  PRIMARY KEY (Id_exercice),
  FOREIGN KEY (Id_niveau) REFERENCES Niveau (Id_niveau) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS Niveaux_termines
(
  Id_utilisateur INTEGER NOT NULL,
  Id_niveau   INTEGER NOT NULL,
  PRIMARY KEY (Id_utilisateur, Id_niveau),
  FOREIGN KEY (Id_utilisateur) REFERENCES Utilisateur (Id_utilisateur) ON DELETE CASCADE ,
  FOREIGN KEY (Id_niveau) REFERENCES Niveau (Id_Niveau) ON DELETE CASCADE 
);


CREATE TABLE IF NOT EXISTS Indices
(
  Id_indice   INTEGER NOT NULL,
  Id_exercice INTEGER NOT NULL,
  Instruction VARCHAR NULL    ,
  Ordre       INT     NULL    ,
  PRIMARY KEY (Id_indice), 
  FOREIGN KEY (Id_exercice) REFERENCES Exercices (Id_exercice) ON DELETE CASCADE 
);


CREATE TABLE IF NOT EXISTS Niveau
(
  Id_niveau  INTEGER NOT NULL,
  Nom        VARCHAR NULL    ,
  Nom_etoile VARCHAR NULL    ,
  Id_cours   INTEGER NOT NULL,
  PRIMARY KEY (Id_niveau),
  FOREIGN KEY (Id_cours) REFERENCES Cours (Id_cours) ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS Utilisateur
(
  Id_utilisateur INTEGER NOT NULL,
  Nom            VARCHAR NULL    ,
  Mdp				  VARCHAR NULL    , 
  Prenom         VARCHAR NULL    ,
  Photo          VARCHAR NULL    ,
  Email          VARCHAR NOT NULL UNIQUE ,
  PRIMARY KEY (Id_utilisateur)
);



INSERT INTO Cours (Id_cours, Nom) VALUES
(1, 'Programmation SQL'),
(2, 'Programmation Python');


INSERT INTO Niveau (Id_niveau, Nom, Nom_etoile, Id_cours) VALUES
(1, 'Débutant', 'Bronze', 1),
(2, 'Intermédiaire', 'Argent', 1),
(3, 'Avancé', 'Or', 1),
(4, 'Débutant', 'Bronze', 2);


INSERT INTO Exercices (Id_exercice, Nom, Instruction, Code_exercice, Code_solution, Id_niveau) VALUES
(1, 'SELECT simple', 'Sélectionner tous les utilisateurs', 'SELECT * FROM Utilisateur;', 'SELECT * FROM Utilisateur;', 1),
(2, 'WHERE simple', 'Sélectionner les utilisateurs nommés Dupont', 'SELECT * FROM Utilisateur WHERE Nom = ?;', 'SELECT * FROM Utilisateur WHERE Nom = ''Dupont'';', 1),
(3, 'JOIN simple', 'Afficher les niveaux avec leur cours', 'SELECT ...', 'SELECT n.Nom, c.Nom FROM Niveau n JOIN Cours c ON n.Id_cours = c.Id_cours;', 2),
(4, 'Sous-requête', 'Lister les exercices terminés par un utilisateur', 'SELECT ...', 'SELECT * FROM Exercices WHERE Id_exercice IN (SELECT Id_exercice FROM Exercices_termines);', 3),
(5, 'Python print', 'Afficher Hello World', 'print()', 'print("Hello World")', 4);


INSERT INTO Utilisateur (Id_utilisateur, Nom, Prenom, Mdp, Photo, Email) VALUES
(1, 'Dupont', 'Jean', '123map', 'jean.png', 'jean.dupont@email.com'),
(2, 'Martin', 'Claire','123map', 'claire.png', 'claire.martin@email.com'),
(3, 'Durand', 'Paul','123map', NULL, 'paul.durand@email.com');


INSERT INTO Indices (Id_indice, Id_exercice, Instruction, Ordre) VALUES
(1, 1, 'Utilise SELECT *', 1),
(2, 2, 'Ajoute une clause WHERE', 1),
(3, 2, 'Attention aux guillemets', 2),
(4, 3, 'Utilise JOIN ... ON', 1),
(5, 4, 'Une sous-requête est nécessaire', 1);

PRAGMA foreign_keys=ON;


--DELETE FROM Utilisateur WHERE Id_utilisateur = 1;








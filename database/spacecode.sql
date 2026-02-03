DROP TABLE Utilisateur;
DROP TABLE Niveau;
DROP TABLE Indices;
DROP TABLE Exercices_termines;
DROP TABLE Exercices;
DROP TABLE Exercice_suivant;
DROP TABLE Cours;
DROP TABLE Indices_utilises; 

CREATE TABLE IF NOT EXISTS Cours
(
  Id_cours INTEGER NOT NULL,
  Nom      VARCHAR NULL    ,
  PRIMARY KEY (Id_cours)
);

CREATE TABLE IF NOT EXISTS Exercice_suivant
(
  Id_exercice         INTEGER NOT NULL,
  Id_exercice_suivant INTEGER NULL    ,
  PRIMARY KEY (Id_exercice, Id_exercice_suivant),
  FOREIGN KEY (Id_exercice) REFERENCES Exercices (Id_exercice),
  FOREIGN KEY (Id_exercice_suivant) REFERENCES Exercices (Id_exercice)
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
  FOREIGN KEY (Id_niveau) REFERENCES Niveau (Id_niveau)
);

CREATE TABLE IF NOT EXISTS Exercices_termines
(
  Id_utilisateur INTEGER NOT NULL,
  Id_exercice    INTEGER NOT NULL,
  PRIMARY KEY (Id_utilisateur, Id_exercice),
  FOREIGN KEY (Id_utilisateur) REFERENCES Utilisateur (Id_utilisateur),
  FOREIGN KEY (Id_exercice) REFERENCES Exercices (Id_exercice)
);


CREATE TABLE IF NOT EXISTS Indices
(
  Id_indice   INTEGER NOT NULL,
  Id_exercice INTEGER NOT NULL,
  Instruction VARCHAR NULL    ,
  Ordre       INT     NULL    ,
  PRIMARY KEY (Id_indice),
  FOREIGN KEY (Id_exercice) REFERENCES Exercices (Id_exercice)
);

CREATE TABLE IF NOT EXISTS Indices_utilises
(
	Id_utilisateur INTEGER NOT NULL,
	Id_indice INTEGER NOT NULL,
	PRIMARY KEY (Id_utilisateur, Id_indice),
	FOREIGN KEY (Id_utilisateur ) REFERENCES Utilisateur (Id_utilisateur),
	FOREIGN KEY (Id_indice) REFERENCES Indices (Id_indice)
);

CREATE TABLE IF NOT EXISTS Niveau
(
  Id_niveau  INTEGER NOT NULL,
  Nom        VARCHAR NULL    ,
  Nom_etoile VARCHAR NULL    ,
  Id_cours   INTEGER NOT NULL,
  PRIMARY KEY (Id_niveau),
  FOREIGN KEY (Id_cours) REFERENCES Cours (Id_cours)
);

CREATE TABLE IF NOT EXISTS Utilisateur
(
  Id_utilisateur INTEGER NOT NULL,
  Nom            VARCHAR NULL    ,
  Mdp				  VARCHAR NOT NULL, 
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


INSERT INTO Exercice_suivant (Id_exercice, Id_exercice_suivant) VALUES
(1, 2),
(1, 5),
(2, 3),
(3, 4);


INSERT INTO Utilisateur (Id_utilisateur, Nom, Prenom, Photo, Email) VALUES
(1, 'Dupont', 'Jean', 'jean.png', 'jean.dupont@email.com'),
(2, 'Martin', 'Claire', 'claire.png', 'claire.martin@email.com'),
(3, 'Durand', 'Paul', NULL, 'paul.durand@email.com');


INSERT INTO Exercices_termines (Id_utilisateur, Id_exercice) VALUES
(1, 1),
(1, 2),
(1, 5),
(2, 1),
(2, 2),
(2, 3),
(3, 1);


INSERT INTO Indices (Id_indice, Id_exercice, Instruction, Ordre) VALUES
(1, 1, 'Utilise SELECT *', 1),
(2, 2, 'Ajoute une clause WHERE', 1),
(3, 2, 'Attention aux guillemets', 2),
(4, 3, 'Utilise JOIN ... ON', 1),
(5, 4, 'Une sous-requête est nécessaire', 1);


INSERT INTO Indices_utilises (Id_utilisateur, Id_indice) VALUES
(1, 1),
(1, 3),
(2, 4);





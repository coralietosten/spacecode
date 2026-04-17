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
  Doc				 VARCHAR NULL    ,
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
  Ordre       INTEGER NULL    ,
  PRIMARY KEY (Id_indice), 
  FOREIGN KEY (Id_exercice) REFERENCES Exercices (Id_exercice) ON DELETE CASCADE 
);


CREATE TABLE IF NOT EXISTS Niveau
(
  Id_niveau  INTEGER NOT NULL,
  Nom        VARCHAR NULL    ,
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



INSERT OR IGNORE INTO Cours (Id_cours, Nom) VALUES
(1, 'HTML'),
(2, 'CSS'),
(3, 'JavaScript');


INSERT OR IGNORE INTO Niveau (Id_niveau, Nom, Id_cours) VALUES
(1, 'Débutant', 1),
(2, 'Intermédiaire', 1),
(3, 'Avancé', 1),
(4, 'Débutant', 2);


INSERT OR IGNORE INTO Exercices (Id_exercice, Nom, Instruction, Code_exercice, Code_solution, Id_niveau) VALUES
(1, 'Balises titres', 'Remplacer des balises <p> par des balises <h1>, <h2>, <h3>, <h4>, <h5>, ou <h6>.', 
'[    
                {
                    "balise": "p",
                    "attributs": {},
                    "autoClose": false,
                    "text" : "Briefing de Mission",
                    "contenus": []
                },
                {
                    "balise": "p",
                    "attributs": {},
                    "autoClose": false,
                    "text" : "Mission Principale",
                    "contenus": []
                },
                {
                    "balise": "p",
                    "attributs": {},
                    "autoClose": false,
                    "text" : "Bienvenue dans cette mission de la plus haute importance. Si vous reussissez, vous pourrez rejoindre \"les sauveurs d’étoiles.\"",
                    "contenus": []
                },
                {
                    "balise": "p",
                    "attributs": {},
                    "autoClose": false,
                    "text" : "Objectifs",
                    "contenus": []
                },
                {
                    "balise": "p",
                    "attributs": {},
                    "autoClose": false,
                    "text" : "Objectif principal",
                    "contenus": []
                },
                {
                    "balise": "p",
                    "attributs": {},
                    "autoClose": false,
                    "text" : "Rallumer toutes les étoiles",
                    "contenus": []
                },
                {
                    "balise": "p",
                    "attributs": {},
                    "autoClose": false,
                    "text" : "Objectif secondaire",
                    "contenus": []
                },
                {
                    "balise": "p",
                    "attributs": {},
                    "autoClose": false,
                    "text" : "Comprendre pourquoi toutes les étoiles se sont éteintes",
                    "contenus": []
                }
            ]',
'[
  {
    "balise": "h1",
    "attributs": {},
    "autoClose": false,
    "text": "Briefing de Mission",
    "contenus": []
  },
  {
    "balise": "h2",
    "attributs": {},
    "autoClose": false,
    "text": "Mission Principale",
    "contenus": []
  },
  {
    "balise": "p",
    "attributs": {},
    "autoClose": false,
    "text": "Bienvenue dans cette mission de la plus haute importance. Si vous reussissez, vous pourrez rejoindre \"les sauveurs d’étoiles.\"",
    "contenus": []
  },
  {
    "balise": "h3",
    "attributs": {},
    "autoClose": false,
    "text": "Objectifs",
    "contenus": []
  },
  {
    "balise": "h4",
    "attributs": {},
    "autoClose": false,
    "text": "Objectif principal",
    "contenus": []
  },
  {
    "balise": "p",
    "attributs": {},
    "autoClose": false,
    "text": "Rallumer toutes les étoiles",
    "contenus": []
  },
  {
    "balise": "h4",
    "attributs": {},
    "autoClose": false,
    "text": "Objectif secondaire",
    "contenus": []
  },
  {
    "balise": "p",
    "attributs": {},
    "autoClose": false,
    "text": "Comprendre pourquoi toutes les étoiles se sont éteintes",
    "contenus": []
  }
]', 1);

INSERT OR IGNORE INTO Exercices (Id_exercice, Nom, Instruction, Code_exercice, Code_solution, Id_niveau) VALUES
(2, 'Listes HTML', 'Remplacer des balises <p> par des listes <ul> et <li>.',

'[
    { "balise": "p", "attributs": {}, "autoClose": false, "text": "Courses", "contenus": [] },
    { "balise": "p", "attributs": {}, "autoClose": false, "text": "Pommes", "contenus": [] },
    { "balise": "p", "attributs": {}, "autoClose": false, "text": "Bananes", "contenus": [] },
    { "balise": "p", "attributs": {}, "autoClose": false, "text": "Oranges", "contenus": [] }
]',

'[
    {
        "balise": "h2",
        "attributs": {},
        "autoClose": false,
        "text": "Courses",
        "contenus": []
    },
    {
        "balise": "ul",
        "attributs": {},
        "autoClose": false,
        "text": "",
        "contenus": [
            { "balise": "li", "attributs": {}, "autoClose": false, "text": "Pommes", "contenus": [] },
            { "balise": "li", "attributs": {}, "autoClose": false, "text": "Bananes", "contenus": [] },
            { "balise": "li", "attributs": {}, "autoClose": false, "text": "Oranges", "contenus": [] }
        ]
    }
]', 1);

INSERT OR IGNORE INTO Exercices (Id_exercice, Nom, Instruction, Code_exercice, Code_solution, Id_niveau) VALUES
(3, 'Liens HTML', 'Transformer des textes en liens avec la balise <a> et un attribut href.',

'[
    { "balise": "p", "attributs": {}, "autoClose": false, "text": "Google", "contenus": [] },
    { "balise": "p", "attributs": {}, "autoClose": false, "text": "YouTube", "contenus": [] }
]',

'[
    {
        "balise": "a",
        "attributs": { "href": "https://www.google.com" },
        "autoClose": false,
        "text": "Google",
        "contenus": []
    },
    {
        "balise": "a",
        "attributs": { "href": "https://www.youtube.com" },
        "autoClose": false,
        "text": "YouTube",
        "contenus": []
    }
]', 1);

INSERT OR IGNORE INTO Exercices (Id_exercice, Nom, Instruction, Code_exercice, Code_solution, Id_niveau) VALUES
(4, 'Images HTML', 'Remplacer des balises <p> par des images avec la balise <img> et l’attribut src.',

'[
    { "balise": "p", "attributs": {}, "autoClose": false, "text": "image_chat.jpg", "contenus": [] },
    { "balise": "p", "attributs": {}, "autoClose": false, "text": "image_chien.jpg", "contenus": [] }
]',

'[
    {
        "balise": "img",
        "attributs": { "src": "image_chat.jpg", "alt": "Chat" },
        "autoClose": true,
        "text": "",
        "contenus": []
    },
    {
        "balise": "img",
        "attributs": { "src": "image_chien.jpg", "alt": "Chien" },
        "autoClose": true,
        "text": "",
        "contenus": []
    }
]', 1);


INSERT OR IGNORE INTO Utilisateur (Id_utilisateur, Nom, Prenom, Mdp, Photo, Email) VALUES
(1, 'Dupont', 'Jean', '123map', 'jean.png', 'jean.dupont@email.com'),
(2, 'Martin', 'Claire','123map', 'claire.png', 'claire.martin@email.com'),
(3, 'Durand', 'Paul','123map', NULL, 'paul.durand@email.com');


INSERT OR IGNORE INTO Indices (Id_indice, Id_exercice, Instruction, Ordre) VALUES
(1, 1, 'Les balises utilisés sont <h1>, <h2>, <h3>, et <h4>', 1);

INSERT OR IGNORE INTO Indices (Id_indice, Id_exercice, Instruction, Ordre) VALUES
(2, 2, 'Utilise une balise <ul> pour contenir la liste.', 1),
(3, 2, 'Chaque élément de la liste doit être dans une balise <li>.', 2),

(4, 3, 'La balise <a> permet de créer un lien.', 1),
(5, 3, 'Utilise l’attribut href pour indiquer l’adresse du lien.', 2),

(6, 4, 'La balise <img> permet d’afficher une image.', 1),
(7, 4, 'Utilise l’attribut src pour définir le chemin de l’image.', 2),
(8, 4, 'L’attribut alt permet de décrire l’image.', 3);



INSERT OR IGNORE INTO Niveaux_termines (Id_utilisateur, Id_niveau) VALUES 
(1,1),
(1,2),
(2,1);

PRAGMA foreign_keys=ON;


--DELETE FROM Utilisateur WHERE Id_utilisateur = 1;








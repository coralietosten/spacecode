/*get utilisateur by ID */
SELECT * FROM Utilisateur ;
--WHERE Id_utilisateur = 1 ;

SELECT * FROM Exercices_termines;

/* recupérer l'exercice suivant d'un exercice */
SELECT Id_exercice_suivant FROM Exercice_suivant
WHERE Id_exercice = 1;


/* recuperer tous les exercices disponible pour l'utilisateur */
/* on donne l'utilisateur */
SELECT Id_exercice_suivant AS exercices_debloques FROM Exercice_suivant
JOIN Exercices_termines ON Exercices_termines.Id_exercice == Exercice_suivant.Id_exercice
WHERE Exercices_termines.Id_utilisateur == 2 AND Exercice_suivant.Id_exercice_suivant NOT IN (
SELECT Id_exercice FROM Exercices_termines WHERE Id_utilisateur == 2);


/* recuperer les indices d'un exercice */
SELECT Id_indice, Instruction, Ordre FROM Indices 
WHERE Id_exercice == 2;


/* vue qui rassemble tous les exercices terminés d'un utilisateur ??? */
CREATE VIEW if not exists progression_utilisateur AS
SELECT Utilisateur.Id_utilisateur, Exercices.Nom, Exercices.Id_exercice 
FROM Utilisateur 
JOIN Exercices_termines ON Exercices_termines.Id_utilisateur == Utilisateur.Id_utilisateur
JOIN Exercices ON Exercices.Id_exercice == Exercices_termines.Id_utilisateur;

/* renvoie les indices utilisés d'un utilisateur pour un exercice */
SELECT Indices_utilises.Id_indice FROM Indices_utilises 
JOIN Indices ON Indices.Id_indice == Indices_utilises.Id_indice
WHERE Id_utilisateur == 1 AND Indices.Id_exercice == 1;

/* renvoie les indices dans l'ordre */
SELECT * FROM Indices
ORDER BY Id_exercice, Ordre;


/* on ne peut pas ajouter un indice utilisé si l'exercice n'est pas dispo pour l'utilisateur ou terminé */











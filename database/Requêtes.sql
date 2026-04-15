/*get utilisateur by ID */
SELECT * FROM Utilisateur ;
--WHERE Id_utilisateur = 1 ;

SELECT * FROM Exercices 
JOIN Niveau ON Niveau.Id_niveau = Exercices.Id_niveau
JOIN Cours ON Cours.Id_cours = Niveau.Id_cours
WHERE Cours.Id_cours = 1;

/* recuperer les indices d'un exercice */
SELECT Id_indice, Instruction, Ordre FROM Indices 
WHERE Id_exercice == 2;

/* renvoie les indices dans l'ordre */
SELECT * FROM Indices
ORDER BY Id_exercice, Ordre;

/* récupérer la progression de chaque utilisateur */
/*recupération des derniers exercices terminé des utilisateurs*/
SELECT Id_utilisateur, MAX(Id_niveau) FROM Niveaux_termines
GROUP BY Id_utilisateur;

/*récupérer le dernier exercice de l'utilisateur*/
SELECT Id_utilisateur, MAX(Id_niveau) FROM Niveaux_termines
WHERE Id_utilisateur = 1;


/*recupérer le cours actuel de l'utilisateur*/
--SELECT Cours.Id_cours FROM Cours
--JOIN Niveau ON Niveau.Id_cours = Cours.Id_cours
--JOIN Exercices ON Exercices.Id_niveau = Niveau.Id_niveau
--JOIN Exercices_termines ON Exercices_termines.Id_exercice = Exercices.Id_exercice
--WHERE Exercices_termines.Id_exercice IN (SELECT MAX(Exercices_termines.Id_exercice) FROM Exercices_termines
--WHERE Exercices_termines.Id_utilisateur = 1); 









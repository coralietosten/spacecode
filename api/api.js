const express = require('express');
const requetes = require('./requetesbdd.js');


const app = express();

app.get('/', (req, res, next) => {
    res.send("Bienvenue dans l'api de spacecode");
});

//-----------------utilisateur--------------------

//récupération de tous les utilisateurs
app.get('/utilisateurs', (req, res, next)=>{
    requetes.utilisateur.all()
    .then(users =>{
        if (!users || users.length==0){
            res.status(200).json({vide:"il n'y a pas d'utilisateurs"});
        }
        else {
            res.json(users);
        }
        })
    .catch(next);
});

//récupération d'un utilisateur par son id
app.get('/utilisateur/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID utilisateur doit être un entier positif" });
    }
    requetes.utilisateur.byId(id)
    .then(user => {
        if(!user || user.length==0) {
            res.status(200).json({vide:"il n'y a pas d'Utilisateur avec cet ID"});
        }    
        else{
            res.json(user);
        } 
    })
    .catch(next);
});

//création d'un utilisateur
app.post('/utilisateur', (req, res, next) => {
    const {nom, prenom, email, password} = req.body;
    console.log(req.body);
    // Vérifications simples
    if (!nom || typeof nom !== 'string' || nom.trim() === '') {
        return res.status(400).json({ error: 'Le champ nom est obligatoire et doit être une chaîne non vide.' });
    }
    if (!prenom || typeof prenom !== 'string' || prenom.trim() === '') {
        return res.status(400).json({ error: 'Le champ prenom est obligatoire et doit être une chaîne non vide.' });
    }

    if (!email || !email.includes('@')) { // simple check email
        return res.status(400).json({ error: 'Le champ email est obligatoire et doit être valide.' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
    }
    requetes.utilisateur.newUtilisateur({nom, prenom ,email, password})
    .then(createdUser => res.status(200).json(createdUser))
    .catch(err => {
    if (err.message.includes('UNIQUE constraint failed')) {
        res.status(409).json({ error: 'Email déjà utilisé' });
    }
    else {
        res.status(400).json({error : err.message});
    }
    });
});

//modification d'un utilisateur
app.put('/utilisateur/:id_user', async (req, res, next) => {
    try {
        const id_user = parseInt(req.params.id_user, 10);
        const {nom, prenom, mdp, photo, email} = req.body;

        // Validation des paramètres
        if (isNaN(id_user) || id_user <= 0) {
            return res.status(400).json({ error: 'id_user doit être un entier positif.' });
        }
        if (!nom || typeof nom !== 'string' || nom.trim() === '') {
            return res.status(400).json({ error: 'Le champ "nom" est obligatoire et doit être une chaîne non vide.' });
        }
        if (!prenom || typeof prenom !== 'string' || prenom.trim() === '') {
            return res.status(400).json({ error: 'Le champ "prenom" est obligatoire et doit être une chaîne non vide.' });
        }
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ error: 'Le champ "email" est obligatoire et doit être valide.' });
        }
        if (!mdp || typeof mdp !== 'string' || mdp.length < 6) {
            return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
        }

        // Vérifie que l'utilisateur existe
        const user = await requetes.utilisateur.byId(id_user);
        if (!user) {
            return res.status(404).json({ error: `Utilisateur avec id ${id_user} non trouvé.` });
        }

        // Mise à jour
        const updatedUser = {nom, prenom, mdp, photo, email};
        const result = await requetes.utilisateur.update(id_user, updatedUser);

        res.status(200).json(result);

    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            res.status(409).json({ error: 'Cet email est déjà utilisé par un autre utilisateur.' });
        } else {
            res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur.' });
            next(err);
        }
    }
});


//suppression d'un utilisateur
app.delete('/utilisateur/:id_utilisateur', async (req, res, next) => {
    try {
        const id_utilisateur = parseInt(req.params.id_utilisateur, 10);

        // Vérification de l'ID
        if (isNaN(id_utilisateur) || id_utilisateur <= 0) {
            return res.status(400).json({ error: "L'ID doit être un entier positif." });
        }

        // Vérification que le thème existe (optionnelle mais recommandée)
        const utilisateur = await requetes.utilisateur.byId(id_utilisateur);
        if (!utilisateur) {
            return res.status(404).json({ error: `Utilisateur avec id ${id_utilisateur} non trouvé.` });
        }

        // Suppression
        const result = await requetes.utilisateur.delete(id_utilisateur);

        if (result.delete) {
            return res.status(200).json({ message: "Utilisateur bien supprimé." });
        } else {
            return res.status(404).json({ error: "Échec de la suppression de l'utilisateur." });
        }
    } catch (err) {
        next(err);
    }
});

//-----------------exercice--------------------

//récupération de tout les exercices
app.get('/exercices', (req, res, next)=>{
    requetes.exercices.all()
    .then(exo =>{
        if (!exo || exo.length==0){
            res.status(200).json({vide:"il n'y a pas d'exercices"});
        }
        else {
            res.json(exo);
        }
        })
    .catch(next);
});

//récupération d'un exercice selon son id
app.get('/exercices/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID exercice doit être un entier positif" });
    }
    requetes.exercices.byId(id)
    .then(exo => {
        if(!exo || exo.length==0) {
            res.status(200).json({vide:"il n'y a pas d'exercices avec cet ID"});
        }    
        else{
            res.json(exo);
        } 
    })
    .catch(next);
});


//récupération des exercices par cours ---> pas sûr
app.get('/exercices/cours/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID cours doit être un entier positif" });
    }
    requetes.exercices.byCours(id)
    .then(exo => {
        if(!exo || exo.length==0) {
            res.status(200).json({vide:"il n'y a pas d'exercices dans ce cours ou l'id cours n'est pas valide"});
        }    
        else{
            res.json(exo);
        } 
    })
    .catch(next);
});


//récupération des exercices par niveau
app.get('/exercices/niveau/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID niveau doit être un entier positif" });
    }
    requetes.exercices.byNiveau(id)
    .then(exo => {
        if(!exo || exo.length==0) {
            res.status(200).json({vide:"il n'y a pas d'exercices dans ce niveau ou l'id niveau n'est pas valide"});
        }    
        else{
            res.json(exo);
        } 
    })
    .catch(next);
});

//récupération des exercices disponible(débloqués) d'un utilisateur
app.get('/exercices_disponibles/:id_utilisateur', (req, res, next) =>{
    const id = parseInt(req.params.id_utilisateur, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.exercices.exoDisponible(id)
    .then(exo => {
        if(!exo || exo.length==0) {
            res.status(200).json({vide:"aucun exercices diaponible pour cet utilisateur"});
        }    
        else{
            res.json(exo);
        } 
    })
    .catch(next);
});


//-----------------exercices terminés--------------------


//récupération des exercices terminés d'un utilisateur 
app.get('/exercices_termines/utilisateur/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.exercices.exoTermine(id)
    .then(exo => {
        if(!exo || exo.length==0) {
            res.status(200).json({vide:"l'utilisateur n'a terminé aucun exercice"});
        }   
        else{
            res.json(exo);
        } 
    })
    .catch(next);
});

//ajout d'un exercice terminé
app.post('/exercice_termine', (req, res, next) => {
    const {id_exo, id_user} = req.body;
    console.log(req.body)
    const id_exercice = parseInt(id_exo, 10);
    console.log(typeof id_exercice, id_exercice);
    const id_utilisateur = parseInt(id_user, 10);
    // Vérifications simples
    if (isNaN(id_exercice) || id_exercice <= 0) {
        return res.status(400).json({ error: "L'ID de l'exercice doit être un entier positif" });
    }
    if (isNaN(id_utilisateur) || id_utilisateur <= 0) {
        return res.status(400).json({ error: "L'ID de l'utilisateur doit être un entier positif" });
    }
    requetes.exercices.newExerciceTermine({id_exercice, id_utilisateur})
    .then(createdExoTermine => res.status(200).json(createdExoTermine))
    .catch(err => {
    if (err.message.includes('UNIQUE constraint failed')) {
        res.status(409).json({ error: 'exercice deja terminé' });
    }
    else {
        res.status(400).json({error : err.message});
    }
    });
});


//-----------------exercice suivant---------------------


//récupération de (ou des) l'exercice suivant d'un exercice
app.get('/exercice_suivant/:id_exercice', (req, res, next) =>{
    const id = parseInt(req.params.id_exercice, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.exercices.exoSuivant(id)
    .then(exo => {
        if(!exo || exo.length==0) {
            res.status(200).json({vide:"exercice suivant introuvable"});
        }   
        else{
            res.json(exo);
        } 
    })
    .catch(next);
});



//-----------------indices utilisés--------------------

//récupération des indices utilisé d'un utilisateur
app.get('/indices_utilises/:id_utilisateur', (req, res, next) =>{
    const id = parseInt(req.params.id_utilisateur, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.indices.indicesUtiliseByUser(id)
    .then(indices => {
        if(!indices || indices.length==0) {
            res.status(200).json({vide:"il n'y a pas d'indices avec cet ID"});
        }    
        else{
            res.json(indices);
        } 
    })
    .catch(next);
});


//ajout d'un indice utilisé
app.post('/indice_utilise', (req, res, next) => {
    const {id_user, id_ind} = req.body;
    const id_utilisateur = parseInt(id_user, 10);
    const id_indice = parseInt(id_ind, 10);
    // Vérifications simples
    if (isNaN(id_utilisateur) || id_utilisateur <= 0) {
        return res.status(400).json({ error: "L'ID de l'exercice doit être un entier positif" });
    }
    if (isNaN(id_indice) || id_indice <= 0) {
        return res.status(400).json({ error: "L'ID de l'utilisateur doit être un entier positif" });
    }
    requetes.indices.newIndiceUtilise({id_utilisateur, id_indice})
    .then(createdIndiceUtilise => res.status(200).json(createdIndiceUtilise))
    .catch(err => {
    if (err.message.includes('UNIQUE constraint failed')) {
        res.status(409).json({ error: 'indice déjà utilisé' });
    }
    else {
        res.status(400).json({error : err.message});
    }
    });
});


//-----------------indices--------------------


//récupération de tous les indices
app.get('/indices', (req, res, next)=>{
    requetes.indices.all()
    .then(indices =>{
        if (!indices || indices.length==0){
            res.status(200).json({vide:"il n'y a pas d'indices"});
        }
        else {
            res.json(indices);
        }
        })
    .catch(next);
});

//récupération d'un indice par son id
app.get('/indice/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.indices.byId(id)
    .then(indices => {
        if(!indices || indices.length==0) {
            res.status(200).json({vide:"il n'y a pas d'indices avec cet ID"});
        }    
        else{
            res.json(indices);
        } 
    })
    .catch(next);
});

//récupération des indices d'un exercice
app.get('/indices/:id_exercice', (req, res, next) =>{
    const id = parseInt(req.params.id_exercice, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.indices.ByExo(id)
    .then(indices => {
        if(!indices || indices.length==0) {
            res.status(200).json({vide:"il n'y a pas d'indices avec cet ID"});
        }    
        else{
            res.json(indices);
        } 
    })
    .catch(next);
});


//-----------------cours--------------------


//récupération de tous les cours
app.get('/cours', (req, res, next)=>{
    requetes.cours.all()
    .then(cours =>{
        if (!cours || cours.length==0){
            res.status(200).json({vide:"il n'y a pas de cours"});
        }
        else {
            res.json(cours);
        }
        })
    .catch(next);
});

//récupération d'un cours par id
app.get('/cours/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.cours.byId(id)
    .then(cours => {
        if(!cours || cours.length==0) {
            res.status(200).json({vide:"il n'y a pas de cours avec cet ID"});
        }    
        else{
            res.json(cours);
        } 
    })
    .catch(next);
});


//-----------------niveau--------------------


//récupération de tous les niveaux
app.get('/niveaux', (req, res, next)=>{
    requetes.niveau.all()
    .then(niveaux =>{
        if (!niveaux || niveaux.length==0){
            res.status(200).json({vide:"il n'y a pas de niveaux"});
        }
        else {
            res.json(niveaux);
        }
        })
    .catch(next);
});

//récupération d'un niveau par son id
app.get('/niveau/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.niveau.byId(id)
    .then(niveau => {
        if(!niveau || niveau.length==0) {
            res.status(200).json({vide:"il n'y a pas de niveau avec cet ID"});
        }    
        else{
            res.json(niveau);
        } 
    })
    .catch(next);
});

//récupération des niveaux appartenant au meme cours
app.get('/niveau/cours/:id', (req, res, next) =>{
    const id = parseInt(req.params.id, 10);
    // verification de l'id
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "L'ID doit être un entier positif" });
    }
    requetes.niveau.byCours(id)
    .then(niveau => {
        if(!niveau || niveau.length==0) {
            res.status(200).json({vide:"il n'y a pas de niveau avec cet ID"});
        }    
        else{
            res.json(niveau);
        } 
    })
    .catch(next);
});





module.exports = app;



const express = require('express');
const requetes = require('./requetesbdd.js');


const app = express();

app.get('/', (req, res, next) => {
    res.send("Bienvenue dans l'api de spacecode");
});

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

module.exports = app;

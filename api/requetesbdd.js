'use strict';

const fs = require('fs');

const dbPath = 'Spacecode.db';
const sqlPath = '../database/spacecode.sql';

const createDb = () => {
    fs.readFile( sqlPath, (err, data) => {
        if (err){
            console.log(err + 'Erreur de création de la base de données');
            console.log(data)
            require('process').exit(-1);
        }
        db.exec(data.toString(), (err) => {
            if (err){
                console.error(err + "Impossible de remplir la base de données");
                require('process').exit(-1);
            }
        });
    });
};

const sqlite3 = require('sqlite3').verbose();
const needCreate = !require('fs').existsSync(dbPath);


const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) =>{
    if (err){
        console.log(err);
        console.error(err + "impossible de créer ou d'ouvrir la base de données");
        require('process').exit(-1);
    }
    db.run("PRAGMA foreign_keys = ON", function(err){
        if (err) {
            console.error("Erreur lors de l'activation des clés étrangères :", err.message);
        }
    });
    console.log(needCreate);
    if (needCreate){
        const sql = fs.readFileSync(sqlPath, "utf8");
        createDb();
    }
});


const get = sql => new Promise(function (resolve, reject){
    db.get(sql, function(err, row){
        if (err){
            reject(err);
        }
        else {
            resolve(row);
        }
    });
});



const all = sql => new Promise(function (resolve, reject) {
    db.all(sql, function (err, rows) { 
        if (err) {
            reject(err);
        }
        else {
            resolve(rows);
        }
    });
});

module.exports = db;


module.exports.utilisateur = {
    all:() => all('SELECT * FROM Utilisateur'),
    byId : id  => get(`SELECT * FROM Utilisateur WHERE Id_utilisateur =${id}`),
    byEmail : email => get(`SELECT * FROM Utilisateur WHERE email = ${email}`),
    newUtilisateur : (user) => new Promise((resolve, reject) => {
        const {Nom, Prenom, Mdp, Photo, Email}= user;
        db.run(`INSERT INTO Utilisateur (Nom, Prenom, Mdp, Photo, Email) VALUES (?,?,?,?,?)`, [Nom, Prenom, Mdp, Photo, Email], function(err) {
            if (err){
                reject(err);
            }
            else {
                resolve(user);
            }
        });
    }),
    delete : (id_utilisateur) => new Promise((resolve, reject) => {
        db.run(`DELETE FROM Utilisateur WHERE Id_utilisateur = ${id_utilisateur}`, function(err){
            if (err) {
                reject(err);
            }
            else {
                resolve({delete : this.changes > 0});
            }
        });
    }),
    update : (id_utilisateur, utilisateur) => new Promise((resolve, reject)=>{
        const {Nom, Prenom, Mdp, Photo, Email} = utilisateur;
        db.run(`UPDATE Utilisateur SET Nom= ?, Prenom = ?, Mdp = ?, Photo = ?, Email = ? WHERE Id_utilisateur = ?` , [Nom , Prenom, Mdp, Photo, Email, id_utilisateur], function(err) {
            if(err){
                reject(err);
            }
            else{
                resolve({update : this.changes > 0});
            }
        });
    }),
};

module.exports.exercices = {
    all : () => all('SELECT * FROM Exercices'),
    byCours : Id_cours => get(`SELECT * FROM Exercices JOIN Cours ON Cours.Id_exercice = Exercice.Id_exercice WHERE Id_cours =${Id_cours}`),
    byNiveau : Id_niveau => get(`SELECT * FROM Exercices JOIN Niveau ON Niveau.Id_exercice = Exercice.Id_exercice WHERE Id_niveau = ${Id_niveau}`),
    byId : Id_exercice => get(`SELECT * FROM Exercices WHERE Id_exercice = ${Id_exercice}`),
    exoTemrine : Id_utilisateur => all(`SELECT * FROM Exercices_termines WHERE Id_utilisateur = ${Id_utilisateur}`),
    newExercice : (exercice ) => new Promise((resolve, reject) =>{
        const {Nom, Instruction, Code_exercice, Code_solution, Id_niveau} = exercice;
        db.run(`INSERT INTO Exercices (Nom, Instruction, Code_exercice, Code_solution, Id_niveau) VALUES (?,?,?,?,?)` , [Nom, Instruction, Code_exercice, Code_solution, Id_niveau], function (err) {
            if (err) {
                reject (err);
            }
            else{
                resolve({Nom, Instruction, Id_niveau});
            }
        });
    }),
};

module.exports.indices = {
    byId : (Id_indice) => get(`SELECT * FROM Indices WHERE Id_indice = ${Id_indice}`),
    byExo : Id_exercice => all(`SELECT * FROM Indices WHERE Id_exercice = ${Id_exercice}`),
    indicesUtiliseByExo : Id_utilisateur => all(`SELECT * FROM Indices_utilises JOIN Indices ON Indices.Id_indice = Indices_utilises.Id_indice WHERE Id_utilisateur = ${Id_utilisateur}`),
    newIndice : (indice) => new Promise((resolve, reject) => {
        const {Id_exercice, Instruction, Ordre} = indice;
        db.run(`INSERT INTO Indices (Id_exercice, Instruction, Ordre) VALUES (?,?,?)`, [Id_exercice, Instruction, Ordre], function(err) {
            if (err){
                reject(err);
            }
            else{
                resolve({Id_exercice, Instruction, Ordre});
            }
        });
    }),
};

module.exports.cours = {
    all : () => all('SELECT * FROM Cours'),
    byId : (Id_cours) => get(`SELECT * FROM Cours WHERE Id_cours = ${Id_cours}`),
    byNom : (nom) => all(`SELECT * FROM Cours WHERE Nom = ${nom}`),
    newCours : (nom) => new Promise((resolve, reject) => {
        db.run(`INSERT INTO Cours (Nom) VALUES ${nom}`, [Id_exercice, Instruction, Ordre], function(err) {
            if (err){
                reject(err);
            }
            else{
                resolve({Id_exercice, Instruction, Ordre});
            }
        });
    }),
};

module.exports.niveau = {
    all : () => all('SELECT * FROM Niveau'),
    byId : (Id_niveau) => get(`SELECT * FROM Niveau WHERE Id_niveau = ${Id_niveau}`),
    byNom : (nom) => all(`SELECT * FROM Niveau WHERE Nom = ${nom}`),
    byCours : Id_cours => all(`SELECT * FROM Niveau WHERE Id_cours = ${Id_cours}`),
    newNiveau : (niveau) => new Promise((resolve, reject) => {
        const {nom, nom_etoile, id_cours} = niveau
        db.run(`INSERT INTO Niveau (Nom, Nom_etoile, Id_cours) VALUES (?,?,?)`, [nom, nom_etoile, id_cours], function(err) {
            if (err){
                reject(err);
            }
            else{
                resolve(niveau);
            }
        });
    }),
};

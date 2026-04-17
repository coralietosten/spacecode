const express = require('express');
import { Request, Response } from "express";
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
import { requireAuth, AuthRequest } from "../middleware/auth"


const userDAO = require('../DAO/UserDAO.ts');
const ExerciceDAO = require('../DAO/ExerciceDAO.ts');
const IndiceDAO = require('../DAO/IndiceDAO.ts');
const Niveau_termineDAO = require ('../DAO/Niveau_termineDAO.ts');

const UtilisateurModel = require ('../model/UtilisateurModel')


module.exports = () => {

    const router = express.Router();

    router.get('/', (req : Request, res : Response) => {
        res.send("Bienvenue dans l'api de spacecode");
    });

    //------------------------utilisateurs---------------------------

    //récupération de tous les utilisateurs
    router.get('/utilisateurs', async (req : Request, res : Response)=>{
        try{
            const utilisateurs = await userDAO.findAll(); 
            if (!utilisateurs || utilisateurs.length==0){
                res.status(200).json({vide:"il n'y a pas d'utilisateurs"});
            }
            else {
                res.status(200).send(utilisateurs);
            }
        }
        catch(err){
            console.log(err);
            res.status(500);
        }
    }); 

    //renvoie les informations de l'utilisateur connecté
    router.get('/utilisateur/me', requireAuth, async(req : AuthRequest, res : Response) => {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ erreur : "Utilisateur non authentifié" });
        }

        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const userId = decoded.id;
            
            
            if (!userId) {
                return res.status(401).json({ erreur: "Utilisateur non authentifié" });
            }
            const utilisateur = await userDAO.findById(userId);
            if(!utilisateur || utilisateur.length==0) {
                res.status(400).json({vide:"Utilisateur introuvable"});
            }    
            else{
                res.status(200).send(utilisateur);
            } 
        }
        catch(err){
            res.status(500).json({err : "erreur " + err});
        }
    });


    //récupération d'un utilisateur par son id
    router.get('/utilisateur/:id', async (req : Request, res : Response) =>{
        try{
            const id: number = +req.params.id;
            //vérification de  l'id
            if(id <= 0){
                res.status(400).json({erreur :"id doit être un entier positif"});
            }
            const utilisateur = await userDAO.findById(id); //ce n'est pas un format json mais un format 'utilisateur dans la bd' => .json ne marche pas
            if(!utilisateur || utilisateur.length==0) {
                res.status(400).json({vide:"il n'y a pas d'Utilisateur avec cet ID"});
            }    
            else{
                res.status(200).send(utilisateur);
            } 
        }
        catch (err){
            res.status(500);
        }
    });

    //création d'un utilisateur
    router.post('/utilisateur', async (req : Request, res : Response) => {
        try{
            const {nom, prenom, email, mdp} = req.body;
            // Vérifications simples
            if (!nom || typeof nom !== 'string' || nom.trim() === '') {
                res.status(400).json({ error: 'Le champ nom est obligatoire et doit être une chaîne non vide.' });
            }
            if (!prenom || typeof prenom !== 'string' || prenom.trim() === '') {
                res.status(400).json({ error: 'Le champ prenom est obligatoire et doit être une chaîne non vide.' });
            }
    
            if (!email || !email.includes('@')) {
                res.status(400).json({ error: 'Le champ email est obligatoire et doit être valide.' });
            }
    
            if (!mdp) {
                res.status(400).json({ error: 'Le mot de passe est obligatoire.' });
            }
            //hash du mdp de l'utilisateur
            const h_mdp = await bcrypt.hash(mdp, 8);

            //vérification que l'utilisateur n'existe pas déjà
            if(await userDAO.findByEmail(email)){
                res.status(400).json({error : "l'utilisateur existe déjà"});
            }
            const result = await userDAO.new({nom, prenom ,email, h_mdp});
            if (result.changes >= 1){
                res.status(200).json({message : "création de l'utilisateur réussi"});
            }
            else{
                res.status(400).json({error : "echec de la création de l'utilisateur"});
            }
        }
        catch(err: any){
            res.status(500).json({error : err.message});
        }
    });

    //connexion d'un utilisateur
    router.post('/utilisateur/login', async (req : Request, res : Response) => {
        try{
            const {email, mdp} = req.body;
            //verification de l'existance de l'utilisateur avec le mail
            if (!email || !email.includes('@')) { // simple check email
                res.status(400).json({ error: 'Le champ email est obligatoire.' });
            }
            if (!mdp) {
                res.status(400).json({ error: 'Le mot de passe est obligatoire.' });
            }

            // verification du mot de passe
            const user = await userDAO.findByEmail(email);
            if (!user){
                res.status(400).json({error : 'email non valide'});
            }

            const verif = user.verifMdp(mdp);
            if (!verif){
                res.status(400).json({ error: 'Impossible de trouver l\'utilisateur.' });
            }
            else{
                //génération du token
                const token = jwt.sign(
                    { id: user.id,
                      email: user.email },
                    process.env.JWT_SECRET || "secretKey",
                    { expiresIn: "24h" }
                );

                //stockage dans les cookies
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });

                res.status(200).json({ message: 'Utilisateur "connecté".', token : token });
            }
        }
        catch(err){
            res.status(500).json({error : err});
        }
    });

    //suppression d'un utilisateur
    router.delete('/utilisateur/:id_utilisateur', async (req : Request, res : Response) => {
        try {
            const id_utilisateur = +req.params.id_utilisateur;

            // Vérification de l'ID
            if (id_utilisateur <= 0) {
                res.status(400).json({ error: "L'id doit être un entier positif." });
            }

            // Vérification que l'utilisateur existe
            const utilisateur = await userDAO.findById(id_utilisateur);
            if (!utilisateur) {
                res.status(404).json({ error: "L'utilisateur n'existe pas" });
            }

            // Suppression
            const result = await userDAO.delete(id_utilisateur);
            if (result.changes >= 1){
                res.status(200).json({message : "suppression de l'utilisateur réussi"});
            }
            else{
                res.status(400).json({error : "echec de la suppression de l'utilisateur"});
            }
        } catch (err : any) {
            res.status(400).json({error : err.message});
        }
    });

    //modification d'un utilisateur
    router.put('/utilisateur/:id_utilisateur', async (req : Request, res : Response) => {
        try {
            const id_user = +req.params.id_user;
            const {nom, prenom, email, mdp} = req.body;

            // Validation des paramètres
            if (id_user <= 0) {
                res.status(400).json({ error: 'id_user doit être un entier positif.' });
            }
            if (!nom || typeof nom !== 'string' || nom.trim() === '') {
                res.status(400).json({ error: 'Le champ "nom" est obligatoire et doit être une chaîne non vide.' });
            }
            if (!prenom || typeof prenom !== 'string' || prenom.trim() === '') {
                res.status(400).json({ error: 'Le champ "prenom" est obligatoire et doit être une chaîne non vide.' });
            }
            if (!email || typeof email !== 'string' || !email.includes('@')) {
                res.status(400).json({ error: 'Le champ "email" est obligatoire et doit être valide.' });
            }
            if (!mdp || typeof mdp !== 'string' || mdp.length < 6) {
                res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères.' });
            }

            // Vérifie que l'utilisateur existe
            const user = await userDAO.findById(id_user);
            if (!user) {
                res.status(404).json({ error: `Utilisateur avec id ${id_user} non trouvé.` });
            }

            // Mise à jour
            req.body.Id_utilisateur = user.id;
            const new_user = new UtilisateurModel(req.body);
            const result = await userDAO.update(user.id, new_user);
            if (result.changes >= 1){
                res.status(200).json({message : "mise à jour de l'utilisateur réussi"});
            }
            else{
                res.status(400).json({error : "echec de la mise à jour de l'utilisateur"});
            }
        } catch (err: any) {
            res.status(400).json({error : err.message});
        }
    });

    router.get('/profile', requireAuth, async(req : AuthRequest, res : Response) => {
        try{
            res.status(200).json({message : "accès autorisé au profil de l'utilisateur"});
        }
        catch(err){
            res.status(500).json({err : "erreur " + err});
        }
    });


    //-------------------------------exercices-----------------------------------------------------
    //récupération de tout les exercices
    router.get('/exercices', async (req : Request, res : Response)=>{
        try{
            const exercices = await ExerciceDAO.findAll();
            if (!exercices || exercices.length==0){
                res.status(200).json({vide:"il n'y a pas d'exercices"});
            }
            else {
                res.status(200).send(exercices);
            }
        }
        catch(err){
            res.status(500);
        }
    });


    //récupération d'un exercice selon son id
    router.get('/exercice/:id', async (req : Request, res : Response) =>{
        try{
            const id: number = +req.params.id;
            if(id <= 0){
                res.status(400).json({erreur :"id doit être un entier positif"});
            }
            const exercice = await ExerciceDAO.findById(id);
            if(!exercice || exercice.length==0) {
                res.status(400).json({vide:"il n'y a pas d'exercice avec cet ID"});
            }    
            else{
                res.status(200).send(exercice);
            } 
        }
        catch(err){
            res.status(500);
        }
    });

    //récupération des exercices par cours
    router.get('/exercices/cours/:id', async(req : Request, res : Response) =>{
        try{
            const id: number = +req.params.id;
            if(id <= 0){
                res.status(400).json({erreur :"id doit être un entier positif"});
            }
            const exercices = await ExerciceDAO.findByCours(id);
            if(!exercices || exercices.length==0) {
                res.status(200).json({vide:"il n'y a pas d'exercices dans ce cours"});
            }    
            else{
                res.json(exercices);
            } 
        }
        catch(err){
            res.status(500);
        }
    });

    //récupération des exercices par niveau
    router.get('/exercices/niveau/:id', async (req : Request, res : Response) =>{
        try{
            const id = +req.params.id;
            // verification de l'id
            if (id <= 0) {
                res.status(400).json({ error: "L'id doit être un entier positif" });
            }
            const exercices = await ExerciceDAO.findByNiveau(id);
            if(!exercices || exercices.length==0) {
                res.status(200).json({vide:"il n'y a pas d'exercices dans ce niveau"});
            }    
            else{
                res.json(exercices);
            } 
        }
        catch(err){
            res.status(500);
        }
    });

    //-----------------indices--------------------

    //     //récupération de tous les indices
    router.get('/indices', async (req : Request, res : Response)=>{
        try{
            const indices = await IndiceDAO.findAll();
            if (!indices || indices.length==0){
                res.status(200).json({vide:"il n'y a pas d'indices"});
            }
            else {
                res.status(200).send(indices);
            }
        }
        catch(err){
            res.status(500);
        }
    });

    //récupération d'un indice par son id
    router.get('/indice/:id', async (req : Request, res : Response) =>{
        try{
            const id = +req.params.id;
            // verification de l'id
            if (id <= 0) {
                return res.status(400).json({ error: "L'ID doit être un entier positif" });
            }
            const indice = await IndiceDAO.findById(id);
            if (!indice || indice.length==0){
                res.status(200).json({vide:"il n'y a pas d'indices"});
            }
            else {
                res.status(200).send(indice);
            }
        }
        catch(err){
            res.status(500).send(err);
        }
    });

    //récupération des indices d'un exercice
    router.get('/indice/exercice/:id_exercice', async (req : Request, res : Response) =>{
        try{
            const id = +req.params.id_exercice;
            // verification de l'id
            if (id <= 0) {
                return res.status(400).json({ error: "L'ID doit être un entier positif" });
            }
            const indices = await IndiceDAO.findByExercice(id);
            if(!indices || indices.length==0) {
                res.status(200).json({vide:"il n'y a pas d'indices pour cet exercice"});
            }    
            else{
                res.json(indices);
            } 
        }
        catch(err){
            res.status(500).send(err);
        }
    });


    //-----------------niveaux terminés--------------------

    //récupération du dernier niveau terminé de l'utilisateur
    router.get('/dernier_niveau_termine/utilisateur/:id', async(req: Request, res: Response) =>{
        try{
            const id = +req.params.id;
            // verification de l'id
            if (id <= 0) {
                return res.status(400).json({ error: "L'ID doit être un entier positif" });
            }
            const exercice = await Niveau_termineDAO.DernierNiveauTermineByUser(id);
            res.status(200).send(exercice);
        }
        catch(err){
            res.status(500).send(err);
        }
    });

    //récupération du dernier niveau terminé de plusieurs utilisateurs
    router.get('/dernier_niveau_termine/utilisateurs', async(req: Request, res: Response) =>{
        try{
            const id = +req.params.id;
            // verification de l'id
            if (id <= 0) {
                return res.status(400).json({ error: "L'ID doit être un entier positif" });
            }
            const exercice = await Niveau_termineDAO.AllDernierNiveauTermine();
            res.status(200).send(exercice);
        }
        catch(err){
            res.status(500).send(err);
        }
    })



    return router;
};
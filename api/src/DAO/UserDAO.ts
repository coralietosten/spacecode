import { all, get, run } from "../utilsDb"
const UtilisateurModel = require ('../model/UtilisateurModel')

const UserDAO = {

    findAll: async ()=> {
        const sql = 'SELECT * FROM Utilisateur';
        const data :any = await all(sql);
        if(!data){
            return;
        }
        
        const users = data.map((utilisateur: any) => new UtilisateurModel(utilisateur));

        //suppression des mdp
        users.forEach((user: any) => {
            user.mdp = null;
        });

        return users;
    },

    findById : async (id : number) =>{
        const sql = `SELECT * FROM Utilisateur WHERE Id_utilisateur =${id}`;
        const data : any = await get(sql);
        if (!data){
            return;
        }
        const user = new UtilisateurModel(data);
        
        //suppression des mdp
        user.mdp = null;

        return user;
    },

    findByEmail: async (email : string) => {
        const sql =`SELECT * FROM Utilisateur WHERE Email = '${email}'`;
        const data : any = await get(sql);
        if (!data){
            return;
        }
        const user = new UtilisateurModel(data);
        return user;
    },

    findByEmailAndMdp : async (email : string, mdp : string)=> {
        console.log('ici');
        const sql = `SELECT *  FROM Utilisateur WHERE Email = '${email}' and Mdp = '${mdp}'`;
        const data : any = await get(sql);
        console.log('ici ' + data);
         if (!data){
            return;
        }
        const user = new UtilisateurModel(data);
        //suppression des mdp
        user.mdp = null;
        return user;
    },

    new: async (user : typeof UtilisateurModel)=>{
        const data: any = run(`INSERT INTO Utilisateur (Nom, Prenom, Email, Mdp) VALUES (?,?,?,?)`,[user.nom, user.prenom, user.email, user.mdp]);
        return data;
    },

    delete : async (id : number) =>{
        const data: any = run(`DELETE FROM Utilisateur WHERE Id_utilisateur = ?`, [id]);
        return data;
    },

    update : async (id : number, user : typeof UtilisateurModel) =>{
        const data : any = run(`UPDATE Utilisateur SET Nom = ?, Prenom = ?,  Email = ?,  Mdp = ? WHERE Id_utilisateur = ?`, [user.nom, user.prenom, user.email, user.mdp, user.id]);
        return data;
    }
};

module.exports = UserDAO;

// Fermer la base de données
// db.close((err: any) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log('Fermeture de la base de données.');
//     }
// });

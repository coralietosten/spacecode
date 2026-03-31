import { all, get } from "../utilsDb"
const ExerciceModel = require ('../model/ExerciceModel');

const ExerciceDAO = {

    findAll: async ()=> {
        const sql = 'SELECT * FROM Exercices';
        const data :any = await all(sql);
        if(!data){
            return;
        }
        console.log(data);
        
        const exercices = data.map((exercice: any) => new ExerciceModel(exercice));

        return exercices;
    }, 

    findById : async (id : number) =>{
        const sql = `SELECT * FROM Exercices WHERE Id_exercice =${id}`;
        const data : any = await get(sql);
        if (!data){
            return;
        }
        const exercice = new ExerciceModel(data);
    
        return exercice;
    }, 

    findByCours : async (id : number)=> {
        const sql =`SELECT * FROM Exercices 
                    JOIN Niveau ON Niveau.Id_niveau = Exercices.Id_niveau
                    JOIN Cours ON Cours.Id_cours = Niveau.Id_cours
                    WHERE Cours.Id_cours = ${id}`;
        const data : any = await all(sql);
        if (!data){
            return;
        }
        const exercices = data.map((exercice: Document) => new ExerciceModel(exercice));
        return exercices;
    },

    findByNiveau : async (id : number)=> {
        const sql =`SELECT * FROM Exercices 
                    WHERE Id_niveau = ${id}`;
        const data : any = await all(sql);
        if (!data){
            return;
        }
        const exercices = data.map((exercice: Document) => new ExerciceModel(exercice));
        return exercices;
    },

    findByNiveauCours : async (id_niveau : number, id_cours : number) =>{
        const sql =`SELECT * FROM Exercices 
                    JOIN Niveau ON Niveau.Id_niveau = Exercices.Id_niveau
                    JOIN Cours ON Cours.Id_cours = Niveau.Id_cours
                    WHERE Cours.Id_cours = ${id_cours} and Niveau.Id_niveau = ${id_niveau}`;
        const data : any = await all(sql);
        if (!data){
            return;
        }
        const exercices = data.map((exercice: Document) => new ExerciceModel(exercice));
        return exercices;
    },
};

module.exports = ExerciceDAO;
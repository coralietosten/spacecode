import { getAllJSDocTags } from "typescript";
import { all, get } from "../utilsDb"

const Exercice_termineDAO = {

    DernierNiveauTermineByUser: async (id : number)=> {
        const sql = `SELECT Id_utilisateur, MAX(Id_niveau) FROM Niveaux_termines WHERE Id_utilisateur = ${id};`; 
        const data :any = await get(sql);
        if(!data){
            return;
        }
        return data;
    },

    AllDernierNiveauTermine: async ()=> {
        const sql = 'SELECT Id_utilisateur, MAX(Id_niveau) FROM Niveaux_termines GROUP BY Id_utilisateur;';
        const data :any = await all(sql);
        if(!data){
            return;
        }
        return data;
    }

}

module.exports = Exercice_termineDAO;

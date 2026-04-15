import { all, get } from "../utilsDb"
const IndiceModel = require ('../model/IndiceModel')

const IndiceDAO = {

    findAll: async ()=> {
        const sql = 'SELECT * FROM Indices';
        const data :any = await all(sql);
        if(!data){
            return;
        }
        
        const indices = data.map((indice: any) => new IndiceModel(indice));

        return indices;
    },

    findById : async (id : number) =>{
        const sql = `SELECT * FROM Indices WHERE Id_indice =${id}`;
        const data : any = await get(sql);
        if (!data){
            return;
        }
        const indice = new IndiceModel(data);

        return indice;
    },

    findByExercice: async (id_exercice : number)=> {
        const sql =`SELECT * FROM Indices WHERE Id_exercice = ${id_exercice}`;
        const data : any = await all(sql);
        const indice = data.map((indice: Document) => new IndiceModel(indice));
        return indice;
    },
};

module.exports = IndiceDAO;

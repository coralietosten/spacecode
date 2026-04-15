

class ExerciceModel {
    id : number;
    nom : string;
    instruction : string;
    code_exercice : string;
    code_solution : string;
    id_niveau : number;

    constructor(jsObject : any){
        this.id = jsObject.Id_utilisateur;
        this.nom = jsObject.Nom;
        this.instruction = jsObject.Instruction;
        this.code_exercice = jsObject.Code_exercice;
        this.code_solution = jsObject.Code_solution;
        this.id_niveau = jsObject.Id_niveau;
    }
}

module.exports = ExerciceModel;

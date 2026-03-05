

class IndiceModel {
    id_indice : number;
    id_exercice : number;
    instruction : string;
    ordre : number;

    constructor(jsObject : any){
        this.id_indice = jsObject.Id_indice;
        this.id_exercice = jsObject.Id_exercice;
        this.instruction = jsObject.Instruction;
        this.ordre = jsObject.Ordre;
    }
}

module.exports = IndiceModel;

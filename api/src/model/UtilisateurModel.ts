
const bcrypt = require('bcrypt');

class UtilisateurModel {
    id : number;
    nom : string;
    prenom : string;
    email : string;
    mdp: string | null;

    constructor(jsObject : any){
        this.id = jsObject.Id_utilisateur || jsObject.id;
        this.nom = jsObject.Nom || jsObject.nom;
        this.prenom = jsObject.Prenom || jsObject.prenom;
        this.email = jsObject.Email || jsObject.email;
        this.mdp = jsObject.Mdp || jsObject.mdp;
    }

    async verifMdp(mdp: string){
        if (this.mdp == null){
            return null;
        }
        return (await bcrypt.compare(mdp, this.mdp));
    }


}

module.exports = UtilisateurModel;
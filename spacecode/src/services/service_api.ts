const API = "http://127.0.0.1:8080/api"

/////////////utilisateur/////////////

async function loadConnectedUtilisateur() {
    const utilisateurResponse = await fetch(API+ "/utilisateur/me",{
        method: "GET",
        credentials: "include"
    });
    let utilisateur = await utilisateurResponse.json();
    return utilisateur;
}

async function createUtilisateur(nom : string, prenom : string, email: string, mdp: string){ //mdp ?
    const response = await fetch(API + "/utilisateur", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nom : nom,
            prenom : prenom, 
            email : email, 
            mdp : mdp, 
        })
    });
}


/////////////exercice/////////////

async function loadExercice(id_exo: number){
    const exerciceResponse = await fetch(API + "/exercice/"+id_exo, { 
        method: "GET",
        credentials: "include"
    });
    
    // id : number;
    // nom : string;
    // instruction : string;
    // code_exercice : string;
    // code_solution : string;
    // id_niveau : number;

    let exercice = await exerciceResponse.json();
    return exercice;
}

async function loadExercicesByCours(id_cours:number){
    const exercicesResponse = await fetch(API + "/exercices/cours/"+id_cours, { 
        method: "GET",
        credentials: "include"
    });
    let exercices = await exercicesResponse.json();
    return exercices;
}

async function loadExercicesByNiveau(id_niveau:number){
    const exercicesResponse = await fetch(API + "/exercices/cours/"+id_niveau, { 
        method: "GET",
        credentials: "include"
    });
    let exercices = await exercicesResponse.json();
    return exercices;
}

async function loadExercices(){
    const exercicesResponse = await fetch(API + "/exercices", { 
        method: "GET",
        credentials: "include"
    });
    let exercices = await exercicesResponse.json();

    // exercices.forEach(async e => {
    //     let id_exo = e.id;
    //     const exerciceResponse = await fetch(API + "/exercice/"+id_exo, { 
    //         method: "GET",
    //         credentials: "include"
    //     });
    // });

    return exercices;
}

/////////////indice/////////////


async function loadIndice(id_indice:number){
    const indiceResponse = await fetch(API + "/indice/"+id_indice, { 
        method: "GET",
        credentials: "include"
    });
    let indice = await indiceResponse.json();
    return indice;
}

async function loadIndicesByExo(id_exo:number){
    const indicesResponse = await fetch(API + "/indice/exercice/"+id_exo, { 
        method: "GET",
        credentials: "include"
    });
    let indices = await indicesResponse.json();
    return indices;
}

async function loadIndices(){
    const indicesResponse = await fetch(API + "/indices", { 
        method: "GET",
        credentials: "include"
    });
    let indices = await indicesResponse.json();
    return indices;
}



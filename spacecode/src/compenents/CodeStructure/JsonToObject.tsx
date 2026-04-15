
import Balise from "./Balise";


class JsonToObject {

    static parse(jsonString: string): Balise[]{
        try {
            const jsonObject = JSON.parse(jsonString);
            return this.parseBalisesArray(jsonObject);
        } catch (error) {
            console.error("Erreur lors de l'analyse JSON :", error);
            return [];
        }
    }

    private static parseBalisesArray(balisesArray: any[]): Balise[] {
        return balisesArray.map(baliseObj => this.parseBalise(baliseObj, 0));
    }

    private static parseBalise(baliseObj: any, level: number): Balise {
        const balise = new Balise(
            baliseObj.balise,
            baliseObj.attributs || [],
            baliseObj.autoClose || false,
            baliseObj.text || null,
            level
        );
        
        if (baliseObj.contenus && Array.isArray(baliseObj.contenus)) {
            baliseObj.contenus.forEach((contenuObj: any) => {
                const contenuBalise = this.parseBalise(contenuObj, level + 1);
                balise.addContenu(contenuBalise);
            });
        }
        return balise;
    }
}

export default JsonToObject;
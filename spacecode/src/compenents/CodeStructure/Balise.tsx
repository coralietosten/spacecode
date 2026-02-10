
class Balise {
    balise: string;
    attributs: string[];
    autoClose: boolean;
    text : string | null;
    level: number;
    contenus: Balise[];

    constructor(balise: string, attributs: string[] = [], autoClose: boolean = false, text: string | null = null, level: number = 0) {
        this.balise = balise;
        this.attributs = attributs;
        this.autoClose = autoClose;
        this.text = text;
        this.level = level;
        this.contenus = [];
    }

    addContenu(balise: Balise){
        this.contenus.push(balise);
    }

    getCode(): string {
        const indent = '\t'.repeat(this.level);
        const openingTag = indent + `<${this.balise}${this.attributs.length > 0 ? ' ' + this.attributs.join(' ') : ''}>` + (this.autoClose || this.text ? '' : '\n');
        const closingTag = (this.autoClose ? '' : (this.text ? '' : indent) + `</${this.balise}>\n`);
        let code = openingTag;
        if (this.text) {
            code += this.text;
        }
        this.contenus.forEach(contenu => {
            code += contenu.getCode();
        });
        code += closingTag;
        return code;
    }

}


export default Balise;
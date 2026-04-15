
class Balise {
    balise: string;
    attributs: string[];
    autoClose: boolean;
    text : string | null;
    level: number;
    contenus: Balise[];
    correctionColor: string;

    constructor(balise: string, attributs: string[] = [], autoClose: boolean = false, text: string | null = null, level: number = 0) {
        this.balise = balise;
        this.attributs = attributs;
        this.autoClose = autoClose;
        this.text = text;
        this.level = level;
        this.contenus = [];
        this.correctionColor = 'red';
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

    getCodeToPrint(): string {
        const indent = '\t'.repeat(this.level);
        const openingTag = indent + `<${this.balise} class='${this.correctionColor}' ${this.attributs.length > 0 ? ' ' + this.attributs.join(' ') : ''}>` + (this.autoClose || this.text ? '' : '\n');
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

    addCorrectionColor(color: string) {
        this.correctionColor = color;
        for (const contenu of this.contenus) {
            contenu.addCorrectionColor(color);
        }
    }

    compareToAndColor(other: Balise) {

        this.correctionColor = 'green';

        if (this.balise !== other.balise) {
            this.correctionColor = 'orange';
        // au pause pour les attributs
        // }else if ( ! (this.attributs.length == 0 || this.attributs == undefined) && (other.attributs.length == 0 || other.attributs == undefined)) {
        //     this.correctionColor = 'orange';
        }else if (this.autoClose !== other.autoClose) {
            this.correctionColor = 'orange';
        }else if (this.text !== other.text) {
            this.correctionColor = 'orange';
        }

        for(let i = 0; i < this.contenus.length; i++) {
            
            if (i < other.contenus.length) {

                const isAnthingThis = other.contenus[i].balise === 'AnyThing';

                this.contenus[i].compareToAndColor(other.contenus[i]);
            }else {
                this.contenus[i].addCorrectionColor('orange');
            }
        }

    }


}


export default Balise;
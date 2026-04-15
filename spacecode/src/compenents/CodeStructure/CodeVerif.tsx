
import Balise from "./Balise";
import TextToObject from "./TextToObject";

class CodeVefif {

    solutionCode: Balise[];

    private solutionCodeString: string;

    constructor(solutionCode: Balise[]) {
        this.solutionCode = solutionCode;
        this.solutionCodeString = solutionCode.map(balise => balise.getCode()).join('\n');
    }

    verifyCode(code: string): boolean {
        const regexCode = this.solutionCodeString.trim()
            .replaceAll('\n', '')
            .replaceAll('\t', '')
            .replaceAll(/(<AnyThing[^>]*>.*?<\/AnyThing>)/gs, '.*?');
        const regex = new RegExp(`^${regexCode}$`, 's');

        const normalizeCode = (value: string): string => {
            const compact = value
                .trim()
                .replaceAll('\n', '')
                .replaceAll('\t', '')
                .replaceAll(/\s+/g, ' ');

            return compact
                .replaceAll(/>\s+</g, '><');
        };

        const normalizedCode = normalizeCode(code);

        return regex.test(normalizedCode);
    }

    tempDelAnything(code: Balise): Balise | null {

        if (code.balise.toLowerCase() === 'anything') {
            return null;
        }

        for (let i = code.contenus.length - 1; i >= 0; i--) {
            const contenu = code.contenus[i];
            const result = this.tempDelAnything(contenu);
            if (result === null) {
                code.contenus.splice(i, 1);
                i--;
            }
        }

        return code;
    }


    colorCode(code: string): { code: string, structureIsValid: boolean } {

        const baliseCode = TextToObject.parse(code);

        if (baliseCode.isValid) {

            for (let i = this.solutionCode.length - 1; i >= 0; i--) {
                const contenu = this.solutionCode[i];
                const result = this.tempDelAnything(contenu);
                if (result === null) {
                    this.solutionCode.splice(i, 1);
                    i--;
                }
            }


            for (let i = 0; i < baliseCode.balises.length; i++) {
                if (i < this.solutionCode.length) {
                    baliseCode.balises[i].compareToAndColor(this.solutionCode[i]);
                    console.log(baliseCode.balises[i]);
                    console.log(this.solutionCode[i]);
                } else {
                    baliseCode.balises[i].addCorrectionColor('orange');
                }
            }

            //todo : utilisation des balise anything

            const stringReturn = baliseCode.balises.map(balise => balise.getCodeToPrint()).join('\n');

            return { code: stringReturn, structureIsValid: baliseCode.isValid };
        }

        return { code, structureIsValid: baliseCode.isValid };
    }

    //TODO : a finir tester l'implementation

}

export default CodeVefif;
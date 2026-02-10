
import Balise from "./Balise";

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

}

export default CodeVefif;
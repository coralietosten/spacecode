
import Balise from "./Balise";


class TextToObject {

    static parse(html: string): {balises : Balise[], isValid: boolean} {
        const balises: Balise[] = [];
        const tagRegex = /<\s*\/?\s*([a-zA-Z0-9]+)([^>]*)>/g;
        let match: RegExpExecArray | null;
        const stack: Balise[] = [];
        let lastIndex = 0;

        while ((match = tagRegex.exec(html)) !== null) {
            const [fullMatch, tagName, attributes] = match;
            const isClosingTag = fullMatch.startsWith('</');
            const isSelfClosing = fullMatch.endsWith('/>');
            const attrList = attributes.trim().split(/\s+/).filter(attr => attr.length > 0);
            const balise = new Balise(tagName, attrList, isSelfClosing, null, stack.length);
            if (stack.length > 0) {
                stack[stack.length - 1].addContenu(balise);
            }
            if (!isClosingTag && !isSelfClosing) {
                stack.push(balise);
            } else if (isClosingTag) {
                if (stack.length === 0 || stack[stack.length - 1].balise !== tagName) {
                    return {balises: [], isValid: false}; // Structure invalide
                }
                stack.pop();
            }
            if (stack.length === 0) {
                balises.push(balise);
            }
            lastIndex = tagRegex.lastIndex;
        }

        if (stack.length > 0) {
            return {balises: [], isValid: false}; // Structure invalide
        }

        return {balises, isValid: true};
    }

}

export default TextToObject;
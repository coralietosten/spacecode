
import Balise from "./Balise";


class TextToObject {

    static parse(html: string): {balises : Balise[], isValid: boolean} {
        let index = 0;
        const source = html ?? "";

        const skipWhitespace = (): void => {
            while (index < source.length && /\s/.test(source[index])) {
                index += 1;
            }
        };

        const normalizeText = (text: string): string => {
            return text.replace(/\s+/g, " ").trim();
        };

        const parseAttributes = (attributesSource: string): string[] => {
            const matches = attributesSource.match(/[^\s"']+|"[^"]*"|'[^']*'/g);
            return matches ? matches : [];
        };

        const parseTag = (): {
            isClosingTag: boolean;
            isSelfClosing: boolean;
            tagName: string;
            attrList: string[];
        } | null => {
            if (source[index] !== "<") {
                return null;
            }

            const closeIndex = source.indexOf(">", index);
            if (closeIndex === -1) {
                return null;
            }

            const rawTag = source.slice(index + 1, closeIndex).trim();
            index = closeIndex + 1;

            if (!rawTag) {
                return null;
            }

            const isClosingTag = rawTag.startsWith("/");
            const normalizedTag = isClosingTag ? rawTag.slice(1).trim() : rawTag;
            const isSelfClosing = !isClosingTag && normalizedTag.endsWith("/");
            const tagContent = isSelfClosing ? normalizedTag.slice(0, -1).trim() : normalizedTag;

            const firstSpace = tagContent.search(/\s/);
            const tagName = (firstSpace === -1 ? tagContent : tagContent.slice(0, firstSpace)).trim();
            const attributes = firstSpace === -1 ? "" : tagContent.slice(firstSpace + 1).trim();

            if (!tagName) {
                return null;
            }

            return {
                isClosingTag,
                isSelfClosing,
                tagName,
                attrList: isClosingTag ? [] : parseAttributes(attributes),
            };
        };

        const appendText = (balise: Balise, text: string): void => {
            const cleanedText = normalizeText(text);
            if (!cleanedText) {
                return;
            }

            balise.text = balise.text ? `${balise.text} ${cleanedText}` : cleanedText;
        };

        const parseNode = (level: number): Balise | null => {
            const openingTag = parseTag();
            if (!openingTag || openingTag.isClosingTag) {
                return null;
            }

            const currentNode = new Balise(openingTag.tagName, openingTag.attrList, openingTag.isSelfClosing, null, level);
            if (openingTag.isSelfClosing) {
                return currentNode;
            }

            while (index < source.length) {
                if (source[index] === "<") {
                    if (source[index + 1] === "/") {
                        const closingTag = parseTag();
                        if (!closingTag || !closingTag.isClosingTag || closingTag.tagName !== currentNode.balise) {
                            return null;
                        }
                        return currentNode;
                    }

                    const childNode = parseNode(level + 1);
                    if (!childNode) {
                        return null;
                    }
                    currentNode.addContenu(childNode);
                    continue;
                }

                const nextTagIndex = source.indexOf("<", index);
                const textChunk = nextTagIndex === -1 ? source.slice(index) : source.slice(index, nextTagIndex);
                appendText(currentNode, textChunk);
                index = nextTagIndex === -1 ? source.length : nextTagIndex;
            }

            return null;
        };

        const balises: Balise[] = [];

        while (index < source.length) {
            skipWhitespace();

            if (index >= source.length) {
                break;
            }

            if (source[index] !== "<") {
                const nextTagIndex = source.indexOf("<", index);
                const outsideText = nextTagIndex === -1 ? source.slice(index) : source.slice(index, nextTagIndex);
                if (normalizeText(outsideText).length > 0) {
                    return {balises: [], isValid: false};
                }
                index = nextTagIndex === -1 ? source.length : nextTagIndex;
                continue;
            }

            const node = parseNode(0);
            if (!node) {
                return {balises: [], isValid: false};
            }
            balises.push(node);
        }

        return {balises, isValid: true};
    }

}

export default TextToObject;
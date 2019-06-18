export { latinise };
/**
 * Méthode qui permet de transformer les accents et charactères spéciaux dans une chaîne de caractères en caractères classiques
 * @param word string - Mot à transformer en version latine
 */
function latinise(word: string): string {
    word = word.replace(new RegExp('á|à|â|ä|ã|å|Ä|Å|Â|Á', 'g'), 'a');
    word = word.replace(new RegExp('Ç|ç', 'g'), 'c');
    word = word.replace(new RegExp('é|è|ë|ê|É|Ê|Ë|È', 'g'), 'e');
    word = word.replace(new RegExp('í|ì|î|ï|Í|Î|Ï|Ì', 'g'), 'i');
    word = word.replace(new RegExp('ñ|Ñ', 'g'), 'n');
    word = word.replace(new RegExp('ó|ò|ô|ö|õ|Ö|Ó|Ô|Ò', 'g'), 'o');
    word = word.replace(new RegExp('ú|ù|û|ü|Ü|Ú|Û|Ù', 'g'), 'u');
    word = word.replace(new RegExp('Æ|æ', 'g'), 'ae');
    word = word.replace(new RegExp('Œ|œ', 'g'), 'oe');
    return word;
}

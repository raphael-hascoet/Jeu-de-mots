export { latinise };
/**
 * Méthode qui permet de transformer les accents et charactères spéciaux dans une chaîne de caractères en caractères classiques
 * @param word string - Mot à transformer en version latine
 */
function latinise(word: string): string {
    word = word.replace(new RegExp('á|à|â|ä|ã|å|Ä|Å|Â|Á'), 'a');
    word = word.replace(new RegExp('Ç|ç'), 'c');
    word = word.replace(new RegExp('é|è|ë|ê|É|Ê|Ë|È'), 'e');
    word = word.replace(new RegExp('í|ì|î|ï|Í|Î|Ï|Ì'), 'i');
    word = word.replace(new RegExp('ñ|Ñ'), 'n');
    word = word.replace(new RegExp('ó|ò|ô|ö|õ|Ö|Ó|Ô|Ò'), 'o');
    word = word.replace(new RegExp('ú|ù|û|ü|Ü|Ú|Û|Ù'), 'u');
    word = word.replace(new RegExp('Æ|æ'), 'ae');
    word = word.replace(new RegExp('Œ|œ'), 'oe');
    return word;
}

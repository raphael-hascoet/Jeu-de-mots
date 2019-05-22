/**
 * Cette fonction calcul le score d'un mot proposé par les joueur en le comparant avec le mot à trouver
 *
 * @param proposedWord le mot proposé par le joueur
 * @param wordToFind le mot à trouver
 *
 * @return le score du mot proposé
 */
export function calculateWordScore(
    proposedWord: string,
    wordToFind: string
): number {
    let score = 0;

    //On ajoute un point pour chaque lettre commune aux deux mots
    for (let i = 0; i < proposedWord.length; i++) {
        if (wordToFind.search(proposedWord.charAt(i)) != -1) {
            score++;
        }
    }

    return score;
}

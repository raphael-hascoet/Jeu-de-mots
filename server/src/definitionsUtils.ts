const request = require('request');
const cheerio = require('cheerio');

const util = require('util');

const getPage = util.promisify(request);

export function getDefinitions(word: string): Promise<Array<string>> {
    return getPage(
        'https://www.larousse.fr/dictionnaires/francais/' + word
    ).then((data: any) => {
        const $ = cheerio.load(data.body);
        const defs = $('.Definitions .DivisionDefinition').toArray();
        const defsHTML: Array<string> = defs.map((def: any) => $(def).html());
        return defsHTML;
    });
}

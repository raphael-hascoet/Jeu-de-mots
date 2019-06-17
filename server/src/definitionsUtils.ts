const request = require('request');
const cheerio = require('cheerio');

const util = require('util');

const getPage = util.promisify(request);

export function getDefinitions(word: string): Promise<Array<string>> {
    return getPage(
        'https://www.larousse.fr/dictionnaires/francais/' + word
    ).then((data: any) => {
        const $ = cheerio.load(data.body);
        if ($('.AdresseDefinition').length) {
            const wordContents = $('.AdresseDefinition').contents();
            const wordDefined = wordContents.get(wordContents.length - 1)
                .nodeValue;
            const defs = $('.Definitions .DivisionDefinition').toArray();
            const defsHTML: Array<string> =
                defs.length > 0
                    ? defs.map((def: any) => {
                          let defText: string = $(def).text();

                          console.log(defText);
                          if ($(def).find('.RubriqueDefinition').length) {
                              const rubrique = $(def)
                                  .find('.RubriqueDefinition')
                                  .text();
                              const text = defText.slice(rubrique.length);
                              defText =
                                  '<strong>' +
                                  rubrique +
                                  '</strong>' +
                                  ' : ' +
                                  text;
                          }

                          if ($(def).find('.ExempleDefinition').length) {
                              defText = defText
                                  .split(':')
                                  .slice(0, -1)
                                  .join(':')
                                  .trim();
                          }
                          return defText;
                      })
                    : [];
            return { word: wordDefined, defs: defsHTML };
        }
        return {};
    });
}
